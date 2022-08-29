const User = require('./User');
const Post = require("./Post");
module.exports = { User, Post };

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

// const User = require('./User');
// const Post = require('./Post');
// const Comment = require('./Comment');

// Post.belongsTo(User, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'
// });

// Post.hasMany(Comment, {
//     foreignKey: 'postId',
//     onDelete: 'CASCADE'
// });

// Comment.belongsTo(User, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'
// });

// module.exports = {
//     User,
//     Comment,
//     Post
// };