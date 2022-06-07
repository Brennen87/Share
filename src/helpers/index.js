import moment from 'moment';
import ReactDOMServer from 'react-dom/server';
import { Emoji } from 'emoji-mart';
import * as React from 'react';
import FileSaver from 'file-saver';
import Resizer from 'react-image-file-resizer';
import { FILE_EXTENSIONS_OF_MIME_TYPES } from '../common/constants';

export const getFullName = (firstName, lastName, role = null) =>
  `${firstName} ${lastName}${role ? ` (${role.charAt(0).toUpperCase() + role.slice(1)})` : ''}`;

export const base64ToBlob = (base64, mime) => {
  mime = mime || '';
  const sliceSize = 1024;
  const byteChars = window.atob(base64);
  const byteArrays = [];

  for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
    const slice = byteChars.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mime });
};

export const selectFormat = array =>
  array
    ? array.map(item => ({
        value: item.id,
        label: item.name
      }))
    : [];

export const responseFormat = array => (array ? array.map(item => item.value) : []);

export const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const readURL = image => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(image);
    } catch (e) {
      reject();
    }
  });
};

export const renderTimestamp = timestamp => {
  return moment(timestamp).format('MMM M, hh:mm A');
};

export const getEmojiHTML = () => {
  const span = (
    <span
      dangerouslySetInnerHTML={{
        __html: Emoji({
          set: 'apple',
          emoji: '+1',
          html: true,
          size: 24
        })
      }}
    />
  );

  return ReactDOMServer.renderToStaticMarkup(span);
};

export const currencyFormat = value => {
  return value
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const currencyFormatInteger = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const financial = x => {
  return Number.parseFloat(x).toFixed(2);
};

export const centToUSD = value => {
  try {
    return currencyFormat(Number(value) / 100);
  } catch (e) {
    return 0;
  }
};

export const usdToCent = value => {
  try {
    return Number.parseInt(Number(value) * 100);
  } catch (e) {
    return 0;
  }
};

export const converseToNumber = value => {
  try {
    return Number(value.replace(/,/g, ''));
  } catch (e) {
    return 0;
  }
};

export const accountingFormat = (value, givenToFixed = 2) => {
  let first = true;
  const pureNumberStringWithOneDecimalPoint = value
    .toString()
    .replace(/[^0-9.]/g, '')
    .replace(/(\.)/g, match => {
      if (first) {
        first = false;
        return match;
      }
      return '';
    });
  let cleanNumber = Number(pureNumberStringWithOneDecimalPoint);
  if (givenToFixed !== null) {
    let toFixed;
    try {
      toFixed = Number(givenToFixed);
    } catch (e) {
      toFixed = 0;
    }
    cleanNumber = cleanNumber.toFixed(toFixed);
  }
  const [whole, remaining] = cleanNumber.toString().split('.');
  return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${remaining ? `.${remaining}` : ''}`;
};

export const lastLogin = (online, timestamp) => {
  if (online) {
    return 'Online';
  }

  if (timestamp) {
    return moment.utc(timestamp).fromNow();
  }

  return 'Offline';
};

export const compareBilling = (current, updated) => {
  const { address, city, zip, country } = current;
  const { address: updAddress, city: updCity, zip: updZip, country: updCountry } = updated;

  if (address !== updAddress || city !== updCity || zip !== updZip || country !== updCountry) {
    return { isSame: false, payload: updated };
  }

  return { isSame: true, payload: current };
};

export const doNothing = () => null;

export const isEmpty = item => !item.length;

export const fileDownload = async (url, name) => {
  return FileSaver.saveAs(url, name);
};

export const forceDownloadFile = (data, fileName, type = 'text/plain') => {
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.href = window.URL.createObjectURL(new Blob([data], { type }));
  a.setAttribute('download', fileName);
  a.click();

  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
};

export const getMimeTypeByFilename = filename => {
  const defaultMimeType = 'text/plain';
  const fileExtension = filename.split('.').pop();
  const mimeTypes = Object.keys(FILE_EXTENSIONS_OF_MIME_TYPES);

  for (let i = 0; i < mimeTypes.length; i++) {
    const mimeType = mimeTypes[i];
    const relatedExtensions = Array.isArray(FILE_EXTENSIONS_OF_MIME_TYPES[mimeType])
      ? FILE_EXTENSIONS_OF_MIME_TYPES[mimeType]
      : [FILE_EXTENSIONS_OF_MIME_TYPES[mimeType]];
    if (relatedExtensions.includes(fileExtension)) {
      return mimeType;
    }
  }
  return defaultMimeType;
};

export const forceDownloadFileFromUrl = (url, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          resolve(forceDownloadFile(blob, fileName, getMimeTypeByFilename(fileName)));
        });
    } catch (error) {
      console.error(error);
      reject(new Error('There was an error while saving the file. Please try again.'));
    }
  });
};

export const formatToDate = datetime =>
  `${datetime.getFullYear()}-${(datetime.getMonth() + 1).toString().padStart(2, '0')}-${datetime
    .getDate()
    .toString()
    .padStart(2, '0')}`;

function resizeTo(file, maxWidth, maxHeight) {
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'JPEG',
      100,
      0,
      uri => {
        resolve(uri);
      },
      'base64'
    );
  });
}

export const resizeToNormalizedImage = file => resizeTo(file, 940, 500);

export const resizeToThumbnailImage = file => resizeTo(file, 184, 184);

export const dataURItoBlob = dataURI => {
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export const nl2br = (str, is_xhtml) => {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  const breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
  return `${str}`.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${breakTag}$2`);
};

export const formatDateToUsFormat = dateObject => {
  return `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject
    .getDate()
    .toString()
    .padStart(2, '0')}/${dateObject.getFullYear()}`;
};

export const parseUsFormatDateToIsoFormat = dateString => {
  const [month, day, year] = dateString?.split('/') || [];
  if (!!year && !!month && !!day) {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  } else {
    return "";
  }
};

export const parseIsoFormatDateToUsFormat = dateString => {
  const [year, month, day] = dateString?.split('-') || [];
  if (!!year && !!month && !!day) {
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  } else {
    return "";
  }
}

export const getFileNameFromUrl = url => {
  const urlParts = url?.split("/");
  return urlParts?.length ? urlParts[urlParts.length - 1]?.split("?")[0] : "";
}

export const generateNameFromAPIName = (apiName) => {
  if (apiName) {
    const underscoreParts = apiName.split("_");
    if (underscoreParts.length > 1) {
      const endPart = underscoreParts.pop();
      const extension = endPart.split(".").pop();
      return `${underscoreParts.join("_")}.${extension}`;
    } else {
      // In case input name was a normal name
      return apiName;
    }
  } else {
    return "";
  }
}

export const generateLast4VisibleOnly = (fullString) => {
  const resultArray = [];
  for (let i = 0; i < fullString.length; i++) {
    resultArray.push(i < fullString.length - 4 ? "*" : fullString[i]);
  }
  return resultArray.join("");
}
