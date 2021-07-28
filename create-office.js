// wd create-entity create-office.js "Minister for X"
module.exports = (label) => {
  return {
    type: 'item',
    labels: {
      en: label,
    },
    descriptions: {
      en: 'government position in Saint Lucia',
    },
    claims: {
      P31:   { value: 'Q294414' }, // instance of: public office
      P279:  { value: 'Q83307'  }, // subclas of: minister
      P17:   { value: 'Q760'    }, // country: St Lucia
      P1001: { value: 'Q760'    }, // jurisdiction: St Lucia
      P361: {
        value: 'Q107675621',         // part of: Cabinet of St Lucia
        references: {
          P854: 'http://www.govt.lc/cabinet',
        },
      }
    }
  }
}
