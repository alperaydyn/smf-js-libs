/* globals SMFAjax, MyApp*/
SMFAjax.get(MyApp.BASE_URL, {
    command: 'GET'
}, function(data) {
    alert({
        title: "get",
        message: data
    });
});