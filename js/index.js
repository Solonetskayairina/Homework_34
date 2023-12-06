    function createTable() {
        let table = document.querySelector('.title tbody')
        let globalPosition;

        const appendRowToTable = (rowData) => {
            const row = document.createElement('tr');

            rowData.forEach((cellData) => {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });

            table.appendChild(row);
        };
        const getWorker = (worker) => {
           appendRowToTable(['Worker', worker.name, worker.age]);
        };

        const getAssistant = (assistant) => {
           appendRowToTable(['Assistant', assistant.name, assistant.age]);
            getFile(`./files/${globalPosition[3]}.json`, getWorker)
        };

        const getManager = (manager) => {
            appendRowToTable(['Manager', manager.name, manager.age]);
            getFile(`./files/${globalPosition[2]}.json`, getAssistant)
        };

        const getInvestor = (investor) => {
            appendRowToTable(['Investor', investor.name, investor.age]);
            getFile(`./files/${globalPosition[1]}.json`, getManager)
        }
        const getPosition = (position) => {
            globalPosition = position;
            getFile(`./files/${position[0]}.json`, getInvestor)
        }
        const getFile = (file, cb) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', file);

            xhr.send();

            xhr.addEventListener('readystatechange', () => {

                if (xhr.readyState === 4) {
                    const isStatus = xhr.status >= 200 && xhr.status < 400;
                    const response = isStatus ? JSON.parse(xhr.response) : [];

                    cb(response);
                }
            })
        };
        getFile("./files/position.json", getPosition)

        document.body.appendChild(table)
    }

    createTable()

