import iconDevEditing from '../../../assets/icons/category/icon_dev_editing.svg';
import iconLineEditing from '../../../assets/icons/category/icon_line_editing.svg';
import iconCopyEditing from '../../../assets/icons/category/icon_copy_editing.svg';
import iconProofreading from '../../../assets/icons/category/icon_proofreading.svg';
import iconGhostwriting from '../../../assets/icons/category/icon_ghostwriting.svg';
import iconPlotting from '../../../assets/icons/category/icon_plotting.svg';
import iconCoverDesign from '../../../assets/icons/category/icon_cover_design.svg';
import iconComicArt from '../../../assets/icons/category/icon_comic_art.svg';
import iconMarketing from '../../../assets/icons/category/icon_marketing.svg';

export const getCategoryIcon = categoryName => {
  switch (categoryName) {
    case 'Developmental Editing':
      return iconDevEditing;
    case 'Line Editing':
      return iconLineEditing;
    case 'Copy Editing':
      return iconCopyEditing;
    case 'Proofreading':
      return iconProofreading;
    case 'Writing / Ghostwriting':
      return iconGhostwriting;
    case 'Plotting / Structure':
      return iconPlotting;
    case 'Book Cover Design':
      return iconCoverDesign;
    case 'Comic Art':
      return iconComicArt;
    case 'Marketing / Ads for Authors':
      return iconMarketing;
    default:
      return null;
  }
};
