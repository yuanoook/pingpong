/*
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
+function(){
    var startTime = new Date().valueOf();
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {

        //防止频度太高的alert报错
        if( new Date().valueOf() - startTime < 5000 ) return;
        startTime = new Date().valueOf();

        var errmsg = "错误信息：" + errorMessage + "\n";
            errmsg +="出错文件：" + scriptURI + "\n";
            errmsg +="出错行号：" + lineNumber + "\n";
            errmsg +="出错列号：" + columnNumber + "\n";
            errmsg +="错误详情：" + JSON.stringify(errorObj);

        alert( errmsg );
    }
}();
