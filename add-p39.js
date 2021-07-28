module.exports = (id, position, personname, positionname) => {
  reference = {
    P854: 'http://www.govt.lc/cabinet',
    P1476: {
      text: 'Web Portal of the Government of Saint Lucia | Cabinet of Ministers',
      language: 'en',
    },
    P813: new Date().toISOString().split('T')[0],
    P407: 'Q1860', // language: English
  }
  if(personname)     reference['P1810'] = personname
  if(positionname)   reference['P1932'] = positionname

  return {
    id,
    claims: {
      P39: {
        value: position,
        qualifiers: {
          P580: '2016-06',
          P5054: 'Q107675631' // Castex Government
        },
        references: reference,
      }
    }
  }
}
