import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import Notify from '../../components/Notification';

export const uploadFile = file => {
  return () => {
    return axios
      .post(Pathes.File.upload, file)
      .then(
        response => response.data && response.data.id && response.data,
        e => Notify.info({ text: 'Could not upload file' })
      )
      .catch(e => Notify.info({ text: 'Something went wrong' }));
  };
};
