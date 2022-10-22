import commentsComponent from './commentsComponent';
import piusComponent from './piusComponent';
import usersComponent from './usersComponent';

const schema = {
  ...commentsComponent,
  ...piusComponent,
  ...usersComponent,
};

export default schema;
