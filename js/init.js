$(function(){
	
	$('.socials').mobilyblocks();
	
	$('.nature').mobilyblocks({
		trigger: 'hover',
		direction: 'counter',
		duration:600,
		zIndex:100,
		widthMultiplier:1.5
	});
	
	$.ajax({
		type: "get",
		data: { status: "批准" },
		url: "http://210.83.195.229:8088/api/HomeAPI/getList",
		async: false,
		success: function(data) {
			if (data) {
                var aboutUSFlag = true,
                aboutUs_ProductsCount = 0;
                $.each(data.rows, function (idx, obj) {
                    var model = obj.CategoryName;
                    switch (model) {
                        case "产品列表":
                            if (aboutUs_ProductsCount < 3) {
                                aboutUs_ProductsCount++;
                                $("#aboutus_products").prepend(template('aboutus_products_template', obj));
                            }
                            break;
                        case "关于我们":
                            if (aboutUSFlag) {
                                $("#owl-demo").find(".fist-slide").html(template("aboutUS",obj));
                                aboutUSFlag = false;
                            }
                            break;
                        default:
                            break;
                    }
                });
            }
		}
	});
});
