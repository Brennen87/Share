import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../../UI/Tag';
import Highlighter from 'react-highlight-words';
import { NavLink } from 'react-router-dom';
import { ReactComponent as DocIcon } from '../../../assets/icons/fileTypeIcons/doc.svg';
import { ReactComponent as XlsIcon } from '../../../assets/icons/fileTypeIcons/xls.svg';
import { ReactComponent as LinkIcon } from '../../../assets/icons/fileTypeIcons/link.svg';
import { ReactComponent as PDFIcon } from '../../../assets/icons/fileTypeIcons/pdf.svg';
import { ReactComponent as PPTIcon } from '../../../assets/icons/fileTypeIcons/ppt.svg';
import { forceDownloadFileFromUrl } from '../../../helpers';
import './index.scss';
import { format } from 'prettier';

const FILE_TYPE = {
  DOC: 'DOCUMENT',
  XLS: 'SPREADSHEET',
  LINK: 'LINK',
  PDF: 'PDF',
  PPT: 'PRESENTATION'
};

const ResourceCard = ({ date, type, title, describe, tags, link, file, onSelectTag, searchTerm, highlight }) => {
  const titleElement = <h2>{title}</h2>;


  const getIcon = Icontype => {
    const iconType = Icontype.toUpperCase();
    switch (iconType) {
      case FILE_TYPE.DOC:
        return <DocIcon />;
      case FILE_TYPE.XLS:
        return <XlsIcon />;
      case FILE_TYPE.PDF:
        return <PDFIcon />;
      case FILE_TYPE.PPT:
        return <PPTIcon />;
      case FILE_TYPE.LINK:
        return <LinkIcon />;
      default:
        return null;
    }
  };

  const formatDate = (date) => {
    const dateArray = date.split("");
    dateArray.splice(6, 0, ",");
    return dateArray.join("");
  }
  
  return (
    <div className="resource_card__inner">
      <div className="resource_card__top">
        <div className="resource_card__title">
          {type && getIcon(type)}
          {link &&
            (link.startsWith('http') ? (
              <a href={link} target="_blank" rel="noreferrer">
                {titleElement}
              </a>
            ) : (
              <NavLink to={link}>{titleElement}</NavLink>
            ))}
          {file && (
            <a
              href={file}
              onClick={async event => {
                event.preventDefault();
                event.nativeEvent.stopImmediatePropagation();
                await forceDownloadFileFromUrl(
                  file,
                  file
                    .replace(/[\#\?].*$/, '')
                    .split('/')
                    .pop()
                );
              }}
            >
              {titleElement}
            </a>
          )}
        </div>
        <span className="resource_card__date">{formatDate(date)}</span>
      </div>
      <div className="resource_card__describe">

        <Highlighter
          className="resource_card__describe_text"
          highlightClassName="highlighted"
          searchWords={highlight ? [searchTerm] : []}
          textToHighlight={describe}
          autoEscape
        />

      </div>

      <div className="resource_card__tags">
        {tags.map(tag => (
          <Tag
            key={tag.id}
            id={tag.id}
            label={tag.name}
            searchText={searchTerm}
            highlight
            getWidth={() => {}}
            onClick={onSelectTag}
          />
        ))}
      </div>

    </div>
  );
};

ResourceCard.prototype = {
  title: PropTypes.string.isRequired,
  descrip: PropTypes.string.isRequired,
  date: PropTypes.any.isRequired,
  tags: PropTypes.array.isRequired
};

export default ResourceCard;
