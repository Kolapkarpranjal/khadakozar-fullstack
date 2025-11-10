const CommitteeMember = require('../models/CommitteeMember');
const Committee = require('../models/Committee');

// List all active members for a committee
const listCommitteeMembers = async (req, res) => {
  try {
    const { committeePath } = req.params;
    
    // Normalize path (Committee model stores path as lowercase)
    const normalizedPath = committeePath.toLowerCase().trim();
    
    // Find committee by path (path is stored as lowercase in Committee model)
    const committee = await Committee.findOne({ path: normalizedPath, isActive: true });
    if (!committee) {
      return res.status(404).json({ success: false, message: 'Committee not found' });
    }
    
    // All CommitteeMember paths are now stored as lowercase
    const members = await CommitteeMember.find({ 
      committeePath: normalizedPath,
      isActive: true 
    })
      .sort({ srNo: 1 })
      .select('-createdBy -__v');
    
    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load committee members' });
  }
};

// List all members for a committee (including inactive) - for admin
const listAllCommitteeMembers = async (req, res) => {
  try {
    const { committeePath } = req.params;
    
    console.log('\n========== ADMIN API CALL ==========');
    console.log('Route hit: /committee/:committeePath/all');
    console.log('Received path:', committeePath);
    console.log('Path type:', typeof committeePath);
    console.log('Path length:', committeePath?.length);
    
    // Normalize path (Committee model stores path as lowercase)
    const normalizedPath = committeePath.toLowerCase().trim();
    console.log('Normalized path:', normalizedPath);
    
    // Check what paths exist in database FIRST
    const allPaths = await CommitteeMember.distinct('committeePath');
    console.log('All paths in DB:', allPaths);
    console.log('Looking for:', normalizedPath);
    console.log('Path exists?', allPaths.includes(normalizedPath));
    
    // Simple query - no populate first
    const members = await CommitteeMember.find({ 
      committeePath: normalizedPath
    })
      .sort({ srNo: 1 })
      .lean(); // Use lean() to get plain objects, faster and avoids populate issues
    
    console.log(`Query result: ${members.length} members found`);
    
    if (members.length > 0) {
      console.log('First member:', {
        srNo: members[0].srNo,
        name: members[0].name,
        path: members[0].committeePath
      });
    } else {
      console.log('NO MEMBERS FOUND! Trying alternative queries...');
      
      // Try without normalization
      const alt1 = await CommitteeMember.find({ committeePath: committeePath }).limit(1);
      console.log('Alt query 1 (no normalize):', alt1.length);
      
      // Try case-insensitive
      const alt2 = await CommitteeMember.find({ 
        committeePath: { $regex: new RegExp(`^${normalizedPath}$`, 'i') }
      }).limit(1);
      console.log('Alt query 2 (case-insensitive):', alt2.length);
      
      // Try finding ANY members
      const anyMembers = await CommitteeMember.find({}).limit(3);
      console.log('Any members in DB:', anyMembers.length);
      if (anyMembers.length > 0) {
        console.log('Sample member path:', anyMembers[0].committeePath);
      }
    }
    
    console.log(`Returning ${members.length} members to frontend`);
    console.log('=====================================\n');
    
    res.json({ success: true, data: members });
  } catch (err) {
    console.error('\n========== ERROR ==========');
    console.error('Error fetching committee members:', err);
    console.error('Error stack:', err.stack);
    console.error('===========================\n');
    res.status(500).json({ success: false, message: 'Failed to load committee members', error: err.message });
  }
};

// Get single committee member
const getCommitteeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await CommitteeMember.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Committee member not found' });
    }
    res.json({ success: true, data: member });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load committee member' });
  }
};

// Create committee member
const createCommitteeMember = async (req, res) => {
  try {
    const { 
      committeePath,
      srNo,
      name,
      nameMarathi,
      designation,
      designationMarathi,
      position,
      positionMarathi,
      address,
      addressMarathi,
      mobile,
      contact,
      category,
      categoryMarathi,
      taluka,
      talukaMarathi,
      grampanchayat,
      grampanchayatMarathi,
      groupName,
      groupNameMarathi,
      presidentName,
      presidentNameMarathi,
      secretary,
      secretaryMarathi,
      memberCount,
      remarks
    } = req.body;
    
    // Normalize path (Committee model stores path as lowercase)
    const normalizedPath = committeePath.toLowerCase().trim();
    
    // Find committee by path (path is stored as lowercase in Committee model)
    const committee = await Committee.findOne({ path: normalizedPath });
    if (!committee) {
      console.error('Committee not found for path:', normalizedPath);
      const allCommittees = await Committee.find({}).select('path titleMarathi');
      console.log('Available committees:', allCommittees.map(c => ({ path: c.path, title: c.titleMarathi })));
      return res.status(404).json({ success: false, message: 'Committee not found' });
    }
    
    // Get max srNo if not provided
    let memberSrNo = srNo;
    if (!memberSrNo || memberSrNo === '') {
      const maxSrNoMember = await CommitteeMember.findOne({ 
        $or: [
          { committeePath: normalizedPath },
          { committeePath: committeePath },
          { committeePath: committeePath.toLowerCase() }
        ]
      })
        .sort({ srNo: -1 });
      memberSrNo = maxSrNoMember ? maxSrNoMember.srNo + 1 : 1;
    }
    
    const member = await CommitteeMember.create({
      committeeId: committee._id,
      committeePath: normalizedPath,
      srNo: memberSrNo,
      name: name || '',
      nameMarathi: nameMarathi || '',
      designation: designation || '',
      designationMarathi: designationMarathi || '',
      position: position || '',
      positionMarathi: positionMarathi || '',
      address: address || '',
      addressMarathi: addressMarathi || '',
      mobile: mobile || '',
      contact: contact || '',
      category: category || '',
      categoryMarathi: categoryMarathi || '',
      taluka: taluka || '',
      talukaMarathi: talukaMarathi || '',
      grampanchayat: grampanchayat || '',
      grampanchayatMarathi: grampanchayatMarathi || '',
      groupName: groupName || '',
      groupNameMarathi: groupNameMarathi || '',
      presidentName: presidentName || '',
      presidentNameMarathi: presidentNameMarathi || '',
      secretary: secretary || '',
      secretaryMarathi: secretaryMarathi || '',
      memberCount: memberCount || 0,
      remarks: remarks || '',
      createdBy: req.user?._id
    });

    res.status(201).json({ success: true, data: member });
  } catch (err) {
    console.error('Create committee member error:', err);
    res.status(500).json({ success: false, message: 'Failed to add committee member', error: err.message });
  }
};

// Update committee member
const updateCommitteeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const member = await CommitteeMember.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ success: false, message: 'Committee member not found' });
    }

    res.json({ success: true, data: member });
  } catch (err) {
    console.error('Update committee member error:', err);
    res.status(500).json({ success: false, message: 'Failed to update committee member', error: err.message });
  }
};

// Delete committee member
const deleteCommitteeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await CommitteeMember.findById(id);
    
    if (!member) {
      return res.status(404).json({ success: false, message: 'Committee member not found' });
    }

    await CommitteeMember.findByIdAndDelete(id);
    res.json({ success: true, message: 'Committee member deleted successfully' });
  } catch (err) {
    console.error('Delete committee member error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete committee member', error: err.message });
  }
};

// Bulk create committee members
const bulkCreateCommitteeMembers = async (req, res) => {
  try {
    const { committeePath, members } = req.body;
    
    if (!Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ success: false, message: 'Members array is required' });
    }
    
    // Find committee by path
    const committee = await Committee.findOne({ path: committeePath });
    if (!committee) {
      return res.status(404).json({ success: false, message: 'Committee not found' });
    }
    
    // Prepare members data
    const membersToInsert = members.map(member => ({
      committeeId: committee._id,
      committeePath,
      srNo: member.srNo || 0,
      name: member.name || '',
      nameMarathi: member.nameMarathi || '',
      designation: member.designation || '',
      designationMarathi: member.designationMarathi || '',
      position: member.position || '',
      positionMarathi: member.positionMarathi || '',
      address: member.address || '',
      addressMarathi: member.addressMarathi || '',
      mobile: member.mobile || '',
      contact: member.contact || '',
      category: member.category || '',
      categoryMarathi: member.categoryMarathi || '',
      taluka: member.taluka || '',
      talukaMarathi: member.talukaMarathi || '',
      grampanchayat: member.grampanchayat || '',
      grampanchayatMarathi: member.grampanchayatMarathi || '',
      groupName: member.groupName || '',
      groupNameMarathi: member.groupNameMarathi || '',
      presidentName: member.presidentName || '',
      presidentNameMarathi: member.presidentNameMarathi || '',
      secretary: member.secretary || '',
      secretaryMarathi: member.secretaryMarathi || '',
      memberCount: member.memberCount || 0,
      remarks: member.remarks || '',
      createdBy: req.user?._id
    }));
    
    const result = await CommitteeMember.insertMany(membersToInsert);
    res.status(201).json({ success: true, data: result, count: result.length });
  } catch (err) {
    console.error('Bulk create committee members error:', err);
    res.status(500).json({ success: false, message: 'Failed to add committee members', error: err.message });
  }
};

module.exports = {
  listCommitteeMembers,
  listAllCommitteeMembers,
  getCommitteeMember,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
  bulkCreateCommitteeMembers
};

