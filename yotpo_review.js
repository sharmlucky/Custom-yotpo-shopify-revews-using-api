document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function () {
      

        /*
         * @sdataId get product Id.
         */
        var sdataId = $('.product-single__title').attr('data-id');
        console.log('my sdata-id' + ' ' + sdataId);
        /**
         *get response using api.
         */
        $.get('https://api.yotpo.com/v1/widget/6jyxeFyL6c2VmhiXvbCyRVzytTwcmSEkExIOubKZ/products/' + sdataId + '/reviews.json', function (data) {
            /*
             *@cbottomLine get total review  
             */
            var cbottomLine = data.response.bottomline.total_review;
            if (cbottomLine == 0) {
                $('.cstm_rating').hide();
                $('.all_rating').hide();
            }
          
            console.log('total reviewss' + cbottomLine);
            var cbottomLines = data.response.reviews;
            console.log(cbottomLines + "hello");
            /*
             * append total reviews .
             */
            $('.total_reviews').append("<h3>" + cbottomLine + " PRODUCT REVIEWS</h3>");
            //avrage rating
            /*
             *@cAvegRating avreage rating
             *@roundRating remove rounds in rating 
             */
            var cAvegRating = data.response.bottomline.average_score;
          
          var newRate = cAvegRating.toFixed(1);
           var roundRating = Math.round(cAvegRating);
            console.log(cAvegRating + "rating");
            /*
             *@avgR get aevrage rating and implement with star rating.
             *
             */
            var avgR = "<ul class='ratingavg'>";
            if (cAvegRating) {
                for (i = 1; i < cAvegRating; i++) {
                    avgR += "<li><i title='" + cAvegRating + "' class='fa fa-star'></i></li>";
                }
                if (roundRating > cAvegRating) {
                    avgR += "<li><i title='" + cAvegRating + "' class='fa fa-star-half-o'></i></li>";
                } else {
                    avgR += "<li><i title='" + cAvegRating + "' class='fa fa-star'></i></li>";
                }
                for (j = roundRating; j < 5; j++) {
                    avgR += "<li><i title='" + cAvegRating + "' class='fa fa-star-o' aria-hidden='true'></i></li>";
                }
            } else {
                avgR += '<li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
            }
            avgR += "</ul><span class='tlrating'>" + newRate + "</span>";
            /*
             * append all avrage rating in a div.
             */
            $('.cstm_rating').html(avgR);
            /*
             *get all rating with progress bar.
             */
            /*
             * curent  page url
             */
            var pageURL = $(location).attr("href");
            console.log('current' + pageURL);
            /*
             * @ratingBar ratingbar for slider 
             */
            var ratingBar = data.response.bottomline.star_distribution;
          
            console.log(ratingBar);
            var ratDiv = '<div class="trustyou-progressbar">';
            $.each(ratingBar, function (key, value) {
              
    
                console.log(key + "-" + value);
              
              
                ratDiv = '<div class="prg_bar">' + key + ' Star <div class="progress progressFill" style="width:100px; border:solid; height:30px;"><span class="progress-bar ani-puan" ani-puan=' + value + ' data-width="' + value + '" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></span></div>' + value + '</div>'+ratDiv;
            });
            ratDiv += '</div>';
          
          
          
          
            $('.all_rating').html(ratDiv);
            /*rating color script*/
            var getprogressPuan = $('.ani-puan').attr('ani-puan');
            console.log('check progress' + getprogressPuan);
            $(".ani-puan").css("width", getprogressPuan + "%");
            var ttl = 0;
            $('.prg_bar').each(function () {
                ttl = ttl + parseInt($(this).children('.progressFill').children(".ani-puan").data('width'));
            });
            $('.prg_bar').each(function () {
                console.log(ttl);
                var width = (($(this).children('.progressFill').children(".ani-puan").data('width') / ttl) * 100);
                console.log(width);
                $(this).children('.progressFill').children(".ani-puan").css('width', width + "%");
                $(this).children('.progressFill').children(".ani-puan").css('background', "black");
            });
            $('.trustyou-progressbar').filter(function () {
                return $(this).has('.prg_bar').length > 0
            }).each(function () {
                $('.prg_bar').addClass('anotheraclass');
                var pGvalue = $(this).find('.ani-puan').attr('data-id');
                console.log('Progress value' + pGvalue);
            });
            /*
             *@customRewies get all reviews
             */
            var customRewies = data.response.reviews;
            
            // alert("Data Loaded: " + data);
            var div_data = "";
            $.each(customRewies, function (key, value) {
              console.log('reviewsss'+value);
//               if(){
              
              
//               }
              
                var votup = value.votes_up;
                var votDown = value.votes_down;
                console.log('new votup' + votup);
                var formattedDate = new Date(value.created_at);
                var d = formattedDate.getDate();
                var m = formattedDate.getMonth();
                m += 1;  // JavaScript months are 0-11
                var y = formattedDate.getFullYear();
                var cstDate = d + "/" + m + "/" + y;
                // console.log(d + "/" + m + "/" + y);
                var disp = value.content.substring(0, 100);
                if (value.verified_buyer == true) {
                    var verified = 'VERIFIED BUYER';
                }
                // star score
                var rating = "";
                for (i = 0; i < value.score; i++) {
                    rating += " <i class='fa fa-star'></i>";
                }
                for (j = value.score; j < 5; j++) {
                    rating += "<i class='fa fa-star-o' aria-hidden='true'></i>";
                }
                console.log(rating);
                div_data += "<div class='col-md-4 inner_review' data-id=" + value.id + "><div class='custUser'><h3>" + value.user.display_name + "</h3></div><div class='varified'>" + verified + "</div> <div class='star_rating'><h4>" + rating + "</h4><span class='rating_date'>" + cstDate + "</span></div> <p class='cstm_disp'>" + disp + "</p> <div class='cstm_share'><a href='JavaScript:Void(0);'class='icon_toggle'><i class='fa fa-share-square'></i> Share</a><div class='share_links' style='display:none;'><a href='https://www.facebook.com/sharer/sharer.php?u=" + pageURL + "' target='_blank'><i class='fa fa-facebook' aria-hidden='true'></i></a><a href='https://twitter.com/intent/tweet?url=" + pageURL + "' target='_blank'><i class='fa fa-twitter' aria-hidden='true'></i></a><a href='https://www.linkedin.com/shareArticle?mini=true&url=" + pageURL + "'target='_blank'><i class='fa fa-linkedin-square' aria-hidden='true'></i></a></div><div class='help_review'><p>Was This Review Helpful?</p><i class='fa fa-thumbs-up' aria-hidden='true' data-id=" + value.id + " data-value=" + votup + ">" + votup + "</i> <i class='fa fa-thumbs-down' aria-hidden='true' data-id=" + value.id + " data-value=" + votDown + ">" + votDown + "</i></div> </div></div>";
            });
            div_data += "";
            /*
             * Add all reviews in slider.
             */
          
          if(cbottomLine == 2){
//             alert('hello');
          
        
           $('.inner_review').css('background-color','red');
          
          }
          
            $(".reviewsSlider").html(div_data);
            /*
             *slick slider init.
             */
          if(cbottomLine < 3){
          
          $('.inner_review').removeClass('col-md-4');
            $('.ctm_prev').hide();
            $('.ctm_next').hide();
          }
          if(cbottomLine > 3){
            $('.reviewsSlider').slick({
        
              arrows: true,
  			  centerPadding: '0px',
			  slidesToShow: 3,
			  slidesToScroll: 1,
			  dots:true,
			  focusOnSelect: true,
			  adaptiveHeight: true,
               
                customPaging: function (slick, index) {
                    return '<a>' + (index + 1) + '</a>';
                },
                nextArrow: '.ctm_next',
                prevArrow: '.ctm_prev'
               
                
            });
         }
            
            if($(window).width() < 601) {
                   $('.reviewsSlider').slick('refresh'); $('.reviewsSlider').slick('slickSetOption','slidesToShow', 2);$('.reviewsSlider').slick('slickSetOption','slidesToScroll', 1);$('.reviewsSlider').slick('slickNext');
         
    }
                if($(window).width() < 481) {
                   $('.reviewsSlider').slick('refresh'); $('.reviewsSlider').slick('slickSetOption','slidesToShow', 1);$('.reviewsSlider').slick('slickSetOption','slidesToScroll', 1);$('.reviewsSlider').slick('slickNext');
         
    }
       
            $('.icon_toggle').on('click', function (event) {
                $('.cstm_share').removeClass('newClass');
                $('.share_links').hide();
                event.preventDefault();
                $(this.parentNode).addClass('newClass');
                if ($(this.parentNode).hasClass('newClass')) {
                    $('.newClass').find('.share_links').toggle();
                } else {
                }
            });
            //ajax call for up
            $('.fa-thumbs-up').on('click', function (e) {
                e.preventDefault();
              $(this).addClass("clicked");
                var revId = $(this).attr('data-id');
                var datId = $(this).attr('data-value');
                console.log("data  value" + datId);
                // alert(revId);
                $.ajax({
                    type: 'post',
                    url: 'https://api.yotpo.com/reviews/' + revId + '/vote/up',
                    success: function (data) {
                        console.log(data);
                        var datId_val = parseInt(datId);
                        datId_val++;
                        console.log(datId_val);
//               var totalUp = parseInt(datId+1); 
                        $(".clicked").text(datId_val);
                      $("i").removeClass("clicked");
                        // console.log(this);
                        //console.log('totlaup '+datId_val );              
                    }
                });
            });
            $('.fa-thumbs-down').on('click', function (e) {
                e.preventDefault();
              $(this).addClass("sclicked");
                 var revId = $(this).attr('data-id');
                var datId = $(this).attr('data-value');
                // alert(revId);
                $.ajax({
                    type: 'post',
                    url: 'https://api.yotpo.com/reviews/' + revId + '/vote/down',
                    success: function (data) {
                         var datId_val = parseInt(datId);
                        datId_val++;
                        console.log(datId_val);
//               var totalUp = parseInt(datId+1); 
                        $(".sclicked").text(datId_val);
                      $("i").removeClass("sclicked");
//                 $('.fa-thumbs-down').append('1');
                    }
                });
            });
//        //ajax call for down   
        });
      
      
      
    });
});
