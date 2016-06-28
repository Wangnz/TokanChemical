$(function() {

    $('.socials').mobilyblocks();

    $('.nature').mobilyblocks({
        trigger: 'hover',
        direction: 'counter',
        duration: 600,
        zIndex: 100,
        widthMultiplier: 1.5
    });

    $.ajax({
        type: "get",
        data: { status: "批准" },
        url: "http://210.83.195.229:8088/api/HomeAPI/getList",
        async: false,
        success: function(data) {
            if (data) {
                var aboutUSFlag = true,
                    servisesFlag = true,
                    partnerFlag = true,
                    assetsFlag = true,
                    mainProductFlag = true,
                    aboutUs_ProductsCount = 0;
                $.each(data.rows, function(idx, obj) {
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
                                $("#owl-demo").find(".fist-slide").html(template("aboutUS", obj));
                                aboutUSFlag = false;
                            }
                            break;
                        case "业务网":
                            if (servisesFlag) {
                                $("#service_boxes").before(template("servises_template", obj));
                                servisesFlag = false;
                            }
                            break;
                        case "合作伙伴":
                            if (partnerFlag) {
                                $("#serviseslider1").append(template("servises_partner_template", obj));
                                partnerFlag = false;
                            }
                            break;
                        case "资产概况":
                            if (assetsFlag) {
                                $("#serviseslider_assets").append(template("servises_partner_template", obj));
                                assetsFlag = false;
                            }
                            break;
                        case "主要产品":
                            if (mainProductFlag) {
                                $("#serviseslider_assets").append(template("servises_partner_template", obj));
                                mainProductFlag = false;
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
