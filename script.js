const authorNameCorrector = (string_author) => {
    if (string_author.length > 50) {
        return string_author.slice(0, 50) + "..."
    } else if (string_author.length == 0) {
        return "By Author not specified"
    } else {
        return string_author
    }
}

const getDateFromNYT = (n_date) => {
    // форма ndate 2022-11-20T03:33:44-05:00
    if (n_date.length == 0) {
        return "Date not specified"
    }
    const months = {
        '01': "january",
        '02': "february",
        '03': "march",
        '04': "april",
        '05': "may",
        '06': "june",
        '07': "july",
        '08': "august",
        '09': "september",
        '10': "october",
        '11': "november",
        '12': "december"
    }
    let getM = n_date.slice(5, 7)
    let getD = n_date.slice(8, 10)
    return `${getD} ${months[getM]}`
}

async function getMostPopularArticles() {
    const sendRequest = await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=hvVL3IwJpPoxRZhIZnx7SsE2oAiypG78')
    const handleRequest = await sendRequest.json()
    const arrayData = handleRequest.results
    const titleArray = []
    console.log(arrayData)
    for (value of arrayData) {
        const getParrent = document.querySelector('.news-container')
        const itemTempalte = `
            <div class="item-card">
            <div class="content-right">
                <div class="news-info">
                    <img src="./Assets/Avatar.png" class="img-avatar" alt="Author Avatar">
                    <p id="author" class="body-r-14">${authorNameCorrector(value.byline)}</p>
                    <p class="body-r-14 black-05">in</p>
                    <p id="topic-name" class="body-r-14">${value.section[0].toUpperCase() + value.section.slice(1)}   · </p>
                    <p id="date" class="body-r-14 black-05">${getDateFromNYT(value.published_date)}</p>
                </div>
                <div class="news-content">
                    <h5>${value.title}</h5>
                    <p class="body-r-16">
                        ${value.abstract}
                    </p>
                </div>
                <div class="news-bottom">
                    <button class="btn-elevated-medium">${value.section[0].toUpperCase() + value.section.slice(1)}</button>
                    <p class="body-r-14 black-05">12 min read</p>
                    <p>·</p>
                    <p class="body-r-14 black-05">Selected for you</p>
                </div>
            </div>
            <div style="background-image: url(${value.multimedia[1].url});" class="img-left">
            </div>
        `
        getParrent.innerHTML += itemTempalte
    }
    console.log(titleArray)
}
getMostPopularArticles()
