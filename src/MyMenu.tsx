import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditRoadIcon from '@mui/icons-material/EditRoad';

const MyMenu = (props: any) => (
  <Menu {...props}>
    <Menu.Item
      to="/sessions"
      primaryText="세션"
      leftIcon={<LibraryBooksIcon />}
    />
    <Menu.Item to="/missions" primaryText="미션" leftIcon={<WysiwygIcon />} />
    <Menu.Item
      to="/studylogs"
      primaryText="인기있는 학습로그"
      leftIcon={<LabelIcon />}
    />
    <Menu.Item
      to="/members"
      primaryText="멤버"
      leftIcon={<AccountCircleIcon />}
    />
    <Menu.Item
      to="/roadmap"
      primaryText="로드맵"
      leftIcon={<EditRoadIcon />}
    />
  </Menu>
);

export default MyMenu;
