import { typography } from 'material-ui/styles';
import { cyan600, grey600, white } from 'material-ui/styles/colors';

const styles = {
    list: {
      height: 'auto',
      maxHeight: '200px',
      overflow: 'scroll',
    },
    subheader: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan600,
      color: white,
    },
    title: {
      fontSize: 36,
      padding: 10,
      fontWeight: typography.fontWeightLight,
      color: grey600
    }
};

export default styles;