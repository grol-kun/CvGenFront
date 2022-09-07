import { PDF_COLORS } from "./pdf-colors";

export const STYLES = {
  list: {
    margin: [0, 0, 0, 16],
    fontSize: 10,
  },
  headerMain: {
    margin: [0, 0, 0, 24],
  },
  headerSide: {
    fontSize: 10,
    color: PDF_COLORS.WHITE,
    margin: [0, 0, 0, 24],
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 1.1,
    bold: true,
    margin: [0, 0, 0, 16],
  },
  name: {
    color: PDF_COLORS.WHITE,
    fontSize: 18,
    margin: [0, 0, 0, 4],
    bold: true,
  },
  title: {
    color: PDF_COLORS.WHITE,
    fontSize: 14,
    margin: [0, 0, 0, 4],
    bold: true,
  },
  headerLinks: {
    margin: [0, 0, 0, 6],
  },
  listItem: {
    fontSize: 9,
    margin: [0, 0, 0, 8],
  },
  tableItemEmpty: {
    fontSize: 9,
    background: PDF_COLORS.GRAY,
  },
  tableItemFilled: {
    fontSize: 9,
    background: PDF_COLORS.RED,
  },
  listItemHeader: {
    color: PDF_COLORS.RED,
    fontSize: 10,
    bold: true,
    margin: [0, 0, 0, 3],
  },
  listItemSubHeader: {
    fontSize: 8,
    margin: [0, 0, 0, 3],
  },
  listItemDesc: {
    lineHeight: 1.1,
    fontSize: 9,
  },
  headerListItem: {
    color: PDF_COLORS.WHITE,
    lineHeight: 1.2,
    margin: [0, 0, 0, 3],
  },
};
