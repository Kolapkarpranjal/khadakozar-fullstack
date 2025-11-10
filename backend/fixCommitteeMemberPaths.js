const mongoose = require('mongoose');
const CommitteeMember = require('./models/CommitteeMember');
require('dotenv').config();

async function fixCommitteeMemberPaths() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/grampanchayat';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Update all CommitteeMember records to use lowercase paths to match Committee model
    const result = await CommitteeMember.updateMany(
      { committeePath: 'janArogyaSamiti' },
      { $set: { committeePath: 'janarogyasamiti' } }
    );
    
    console.log(`Updated ${result.modifiedCount} members from 'janArogyaSamiti' to 'janarogyasamiti'`);
    
    // Verify the update
    const members = await CommitteeMember.find({ committeePath: 'janarogyasamiti' });
    console.log(`Found ${members.length} members with path 'janarogyasamiti'`);
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

fixCommitteeMemberPaths();





