const axios = require('axios')
var HTMLParser = require('node-html-parser');

const name = process.argv[2].toLowerCase().trim()

async function fetchData() {
    const response = await axios.get('https://codequiz.azurewebsites.net/', { headers: {
        'Cookie': 'hasCookie=true'
        }
    })
    const htmlData = HTMLParser.parse(response.data)
    const tableRoot = htmlData.getElementsByTagName('table')[0]
    const rows = tableRoot.getElementsByTagName('tr')
    const parsedData = {}
    for(let row of rows.slice(1)) {
        const columns = row.getElementsByTagName('td')
        parsedData[columns[0].text.trim().toLowerCase().toString()] = columns[1].text
    }
    if (parsedData[name]) console.log(parsedData[name])
    else console.log('Cant find fund')
}

fetchData()
