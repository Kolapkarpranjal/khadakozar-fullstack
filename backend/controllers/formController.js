const FormSubmission = require('../models/FormSubmission');

// Submit form data
const submitForm = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files || [];

    console.log('Form submission received:', {
      formType: formData.formType,
      applicantName: formData.applicantName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      address: formData.address,
      filesCount: files.length
    });

    // Extract basic information
    const {
      formType,
      applicantName,
      contactNumber,
      email,
      address,
      ...otherData
    } = formData;

    // Validate required fields
    if (!formType || !applicantName || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing: formType, applicantName, and contactNumber are required'
      });
    }

    // Process uploaded files
    const documents = files.map(file => ({
      fieldName: file.fieldname,
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype
    }));

    // Create form submission
    const submission = new FormSubmission({
      formType,
      applicantName,
      contactNumber,
      email: email || 'N/A',
      address: address || 'N/A',
      formData: otherData,
      documents,
      submittedFrom: {
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
      }
    });

    await submission.save();

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        submissionId: submission._id,
        status: submission.status
      }
    });

  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit form'
    });
  }
};

// Get all form submissions (admin only)
const getAllSubmissions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      formType,
      status,
      search
    } = req.query;

    // Build filter
    const filter = {};
    if (formType) filter.formType = formType;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { applicantName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { contactNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get submissions
    const submissions = await FormSubmission.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('processedBy', 'email')
      .select('-formData -documents'); // Exclude large fields for list view

    // Get total count
    const total = await FormSubmission.countDocuments(filter);

    res.json({
      success: true,
      data: {
        submissions,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get submissions'
    });
  }
};

// Get single submission details
const getSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await FormSubmission.findById(id)
      .populate('processedBy', 'email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: { submission }
    });

  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get submission'
    });
  }
};

// Update submission status
const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const submission = await FormSubmission.findById(id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Update submission
    submission.status = status;
    if (adminNotes) submission.adminNotes = adminNotes;
    submission.processedBy = req.user._id;
    submission.processedAt = new Date();

    await submission.save();

    res.json({
      success: true,
      message: 'Submission status updated successfully',
      data: { submission }
    });

  } catch (error) {
    console.error('Update submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update submission'
    });
  }
};

// Get form statistics
const getFormStats = async (req, res) => {
  try {
    const stats = await FormSubmission.aggregate([
      {
        $group: {
          _id: '$formType',
          count: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          underReview: {
            $sum: { $cond: [{ $eq: ['$status', 'under-review'] }, 1, 0] }
          },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      }
    ]);

    const totalSubmissions = await FormSubmission.countDocuments();
    const pendingSubmissions = await FormSubmission.countDocuments({ status: 'pending' });
    const underReviewSubmissions = await FormSubmission.countDocuments({ status: 'under-review' });
    const completedSubmissions = await FormSubmission.countDocuments({ status: 'completed' });

    res.json({
      success: true,
      data: {
        totalSubmissions,
        pendingSubmissions,
        underReviewSubmissions,
        completedSubmissions,
        formTypeStats: stats
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics'
    });
  }
};

module.exports = {
  submitForm,
  getAllSubmissions,
  getSubmission,
  updateSubmissionStatus,
  getFormStats
};


