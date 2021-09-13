(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
		var cols = [{
            id: "market",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "candle_date_time_kst",
            alias: "date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "opening_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "high_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "low_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "candle_acc_trade_price",
            alias: "acc_trade_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "candle_acc_trade_volume",
            alias: "acc_trade_volume",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "prev_closing_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "change_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "change_rate",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "upbit",
            alias: "upbit data test",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://raw.githubusercontent.com/BItableau/myconnector/master/UpbitTest/upbit_data.json", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
			        "market": feat[i].market,
                    "candle_date_time_kst": feat[i].candle_date_time_kst,
                    "opening_price": feat[i].opening_price,
                    "high_price": feat[i].high_price,
                    "low_price": feat[i].low_price,
                    "trade_price": feat[i].trade_price,
                    "candle_acc_trade_price": feat[i].candle_acc_trade_price,
                    "candle_acc_trade_volume": feat[i].candle_acc_trade_volume,
                    "prev_closing_price": feat[i].prev_closing_price,
                    "change_price": feat[i].change_price,
                    "change_rate": feat[i].change_rate      
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "upbit data test"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
