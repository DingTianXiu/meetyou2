/**
 * Created by goodo on 2015-08-12.
 */




for (var i = 0; i < days.length; i++) {
    var daytitle = (days[i]["title"])?days[i]["title"]:"";

    //通过判断是否为空，来决定是否显示实心圆点
    if(daytitle=="")
    {
        journey_navigate_day_str += journey_navigate_day_title
            .replace(/\{day_number\}/gm, i + 1)
            .replace("{day_title_intro}",daytitle );
        $("#solid-point-id").hide();
    }
    else {
        journey_navigate_day_str += journey_navigate_day_title
            .replace(/\{day_number\}/gm, i + 1)
            .replace("{day_title_intro}",daytitle );
    }

    slider_content_navigate += slider_content_navigate_day
        .replace(/\{day_number\}/gm, i + 1)
        .replace(/\{day_nav_title\}/gm, daytitle);//+days[i]["subtitle"]
    var scenic_arr = days[i]['items'];
    for (var j = 0; j < scenic_arr.length; j++) {
        var number = scenic_arr[j]['rank'];
        var rank_imgs = '';
        while (number--) {
            rank_imgs += rank_img;
        }
        var scenic_imgs = '';
        var scenic_point_imgs = '';
        number = scenic_arr[j]['pics'].length;
        var y = 0;

        //循环添加图片
        while (number--) {
            scenic_imgs += scenic_img.replace("{img_url}", scenic_arr[j]['pics'][y]+"?imageView/2/w/722/h/480/q/100/format/jpg");
            scenic_point_imgs += scenic_point_img;
            y++;
        }
        var scenic_number = (i + 1) * 10 + j;

        var brief = (scenic_arr[j]["brief"])? scenic_arr[j]["brief"]: "";
        var stitle = (scenic_arr[j]["title"])? scenic_arr[j]["title"]:"";

        if(stitle=="")
        {

            journey_navigate_day_str += journey_navigate_day_scenic
                .replace("{scenic_title}", stitle)
                .replace("{id}",scenic_number)
                .replace("{display}","none")
                .replace("{journey_intro_display}","none")
                .replace("{rank_imgs}", rank_imgs)
                .replace("{brief}", brief )
                .replace("{scenic_imgs}", scenic_imgs)
                .replace("{scenic_img_info}", scenic_arr[j]["description"])
                .replace(/\{scenic_number\}/gm, scenic_number)
                .replace("{scenic_point_imgs}", scenic_point_imgs);

        }
        else{
            journey_navigate_day_str += journey_navigate_day_scenic
                .replace("{scenic_title}", stitle)
                .replace("{id}",scenic_number)
                .replace("{display}","block")
                .replace("{journey_intro_display}","block")
                .replace("{rank_imgs}", rank_imgs)
                .replace("{brief}", brief )
                .replace("{scenic_imgs}", scenic_imgs)
                .replace("{scenic_img_info}", scenic_arr[j]["description"])
                .replace(/\{scenic_number\}/gm, scenic_number)
                .replace("{scenic_point_imgs}", scenic_point_imgs);
        }



//                      journey_navigate_day_str += scrollScript.replace(/\{scenic_number\}/gm, scenic_number);
        slider_content_navigate += slider_content_navigate_scenic
            .replace("{scenic_title}", stitle)
            .replace(/\{scenic_number\}/gm, scenic_number);
    }
    journey_navigate_day_str += journey_space_between_scenic_and_title;
    slider_content_navigate += slider_content_navigate_scenic_end;

}
