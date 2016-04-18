(function(b){b.fullwidthAudioPlayer={version:"1.4.2",author:"Rafael Dery"};jQuery.fn.fullwidthAudioPlayer=function(aA){function aN(f,e){if(!window.fapPopupWin||window.fapPopupWin.closed){window.fapPopupWin=window.open(aO.popupUrl,"","menubar=no,toolbar=no,location=no,width=980,height="+av+",left="+(window.screen.width-980)/2+",top="+(window.screen.height-av)/2+""),null==window.fapPopupWin&&alert("Pop-Up Music Player can not be opened. Your browser is blocking Pop-Ups. Please allow Pop-Ups for this site to use the Music Player."),b(window.fapPopupWin).load(function(){b(".fap-enqueue-track").each(function(j,k){var l=b(k);f+=ax(l)});aO.autoPlay=e;window.fapPopupWin.initPlayer(aO,f);an=!0})}else{var g=b(f);b.fullwidthAudioPlayer.addTrack(g.attr("href"),g.attr("title"),g.data("meta")?b("body").find(g.data("meta")).html():"",g.attr("rel"),g.attr("target"),e)}}function aK(){aO.playlist&&(aD=b('<div class="clear"></div><div class="antiscroll-wrap"><div class="box"><div class="antiscroll-inner"><div id="fap-playlist-wrapper" class="box-inner"><ul id="fap-playlist"></ul></div><div class="clear"></div></div></div>'));aO.xmlPath?b.ajax({type:"GET",url:aO.xmlPath,dataType:"xml",cache:!1,success:function(e){var c=b(e).find("playlists");e=aO.xmlPlaylist?e=aO.xmlPlaylist:e=c.children("playlist:first").attr("id");aE(c.children('playlist[id="'+e+'"]').children("track"));b(".fap-xml-playlist").each(function(g,f){var j=b(f);j.append("<h3>"+f.title+'</h3><ul class="fap-my-playlist"></ul>');c.children('playlist[id="'+f.id+'"]').children("track").each(function(q,l){var m=b(l),p=m.attr("target")?'target="'+m.attr("target")+'"':"",k=m.attr("rel")?'rel="'+m.attr("rel")+'"':"",n=m.find("meta")?'data-meta="#'+f.id+"-"+q+'"':"";j.children("ul").append('<li><a href="'+m.attr("href")+'" title="'+m.attr("title")+'" '+p+" "+k+" "+n+">"+m.attr("title")+"</a></li>");j.append('<span id="'+f.id+"-"+q+'">'+m.find("meta").text()+"</span>")})})},error:function(){alert("XML file could not be loaded. Please check the XML path!")}}):aE(az.children("a"))}function aE(c){az.bind("fap-tracks-stored",function(){++ad;if(ad<c.length){var e=c.eq(ad);b.fullwidthAudioPlayer.addTrack(e.attr("href"),e.attr("title"),aO.xmlPath?e.children("meta").text():az.find(e.data("meta")).html(),e.attr("rel"),e.attr("target"))}else{az.unbind("fap-tracks-stored");aO.randomize&&Z();aF.children("p").remove();aF.append('<div id="fap-meta-wrapper" class="clearfix"><img src="" id="fap-current-cover" style="width: '+aO.coverSize[0]+"px; height:"+aO.coverSize[1]+'px; border: 1px solid #f1f1f1;" /><div id="fap-cover-replacement" style="width: '+aO.coverSize[0]+"px; height:"+aO.coverSize[1]+'px; border: 1px solid #f1f1f1;"></div><p id="fap-current-title" style="color: '+aO.mainColor+';"></p><p id="fap-current-meta" style="color: '+aO.metaColor+';"></p></div>');aC=aF.children("#fap-meta-wrapper").css("height",aO.height-10);at(document.getElementById("fap-cover-replacement"),aO.coverSize[0],aO.coverSize[1]);aO.socials&&aC.append('<p id="fap-social-links"><a href="" target="_blank" style="color: '+aO.metaColor+';">'+aO.soundcloudText+'</a><a href="" target="_blank" style="color: '+aO.metaColor+';">'+aO.downloadText+'</a><a href="" target="_blank" style="color: '+aO.metaColor+';">'+aO.facebookText+'</a><a href="" target="_blank" style="color: '+aO.metaColor+';">'+aO.twitterText+"</a></p>");aG=aF.append('<div id="fap-ui-wrapper"></div>').children("#fap-ui-wrapper").css("height",aO.height);e=aG.append('<div id="fap-ui-nav"></div>').children("#fap-ui-nav");e.css("margin-top",0.5*aO.height-0.5*e.height());e.append('<a href="#" id="fap-previous" style="background-color: '+aO.fillColor+';"><i class="audioplayer icon-step-backward"></i></a>').children("#fap-previous").click(function(){b.fullwidthAudioPlayer.previous();return !1});e.append('<a href="#" id="fap-play-pause" style="background-color: '+aO.fillColor+';"><i class="audioplayer icon-play"></i></a>').children("#fap-play-pause").click(function(){b.fullwidthAudioPlayer.toggle();return !1});e.append('<a href="#" id="fap-next" style="background-color: '+aO.fillColor+';"><i class="audioplayer icon-step-forward"></i></a>').children("#fap-next").click(function(){b.fullwidthAudioPlayer.next();return !1});aG.children("div:first").length&&(aG.width(),aG.children("div:first").position());aG.append('<div id="fap-time-bar" class="clearfix" style="width: '+ai+"px; border: 1px solid "+aO.fillColor+"; margin-top: "+(0.5*aO.height-3)+"px; color: "+aO.metaColor+';"><div id="fap-loading-bar" style="background: '+aO.fillColor+';"></div><div id="fap-progress-bar" style="background:#08c;"></div><span id="fap-current-time">00:00:00</span><span id="fap-total-time">00:00:00</span></div>');aG.find("#fap-loading-bar, #fap-progress-bar").click(function(g){g=(g.pageX-b(this).parent().offset().left)/ai;am?aB.setPosition(g):aB.setPosition(g*aB.duration);aL(g)});aO.volume&&(aG.append('<div id="fap-volume-bar" style="width: '+ac+"px; background: "+aO.fillColor+"; border: 1px solid "+aO.fillColor+"; margin-top: "+(0.5*aO.height-3)+'px;"><div id="fap-volume-progress" style="background:#08c;"></div></div><div id="fap-volume-sign"><i class="audioplayer icon-volume-up"></i></div>'),aG.children("#fap-volume-sign").css("margin-top",0.5*aO.height-0.5*aG.children("#fap-volume-sign").height()),aG.find("#fap-volume-bar").click(function(g){g=(g.pageX-b(this).offset().left)/ac;b.fullwidthAudioPlayer.volume(g)}));if(aO.playlist){"bottom"==aO.wrapperPosition?aF.append(aD):aF.prepend(aD);e=aF.children(".antiscroll-wrap");e.find(".box, .box .antiscroll-inner").height(aO.playlistHeight);ar=e.antiscroll().data("antiscroll");aF.find(".antiscroll-scrollbar").css("backgroundColor",aO.mainColor);"top"==aO.wrapperPosition?e.css({marginBottom:aO.offset}):e.css({marginTop:aO.offset});if(aO.sortable){var f;aD.find("#fap-playlist").sortable().bind("sortstart",function(j,g){f=aD.find("#fap-playlist").children("li").index(g.item)});aD.find("#fap-playlist").sortable().bind("sortupdate",function(m,j){var g=aD.find("#fap-playlist").children("li").index(j.item),k=aJ[f],l=aJ[aI].title;aJ.splice(f,1);aJ.splice(g,0,k);o(l)})}ao?b.fullwidthAudioPlayer.setPlayerPosition("openPlaylist",!1):(aG.append('<a href="#" id="fap-playlist-toggle" style="background-color:'+aO.fillColor+"; margin-top: "+(0.5*aO.height-12)+'px;"><i class="audioplayer icon-reorder"></i></a>'),aG.children("#fap-playlist-toggle").click(function(){ah?b.fullwidthAudioPlayer.setPlayerPosition("closePlaylist",!0):b.fullwidthAudioPlayer.setPlayerPosition("openPlaylist",!0);return !1}))}aO.shuffle&&(aG.append('<a href="#" id="fap-playlist-shuffle" style="background-color:'+aO.fillColor+"; margin-top: "+(0.5*aO.height-12)+'px;"><i class="audioplayer icon-random"></i></a>'),aG.children("#fap-playlist-shuffle").click(function(){Z();return !1}));aG.find("a").hover(function(){b(this).css("backgroundColor",aO.fillColorHover)},function(){b(this).css("backgroundColor",aO.fillColor)});aO.keyboard&&b(document).keyup(function(g){switch(g.which){case 32:b.fullwidthAudioPlayer.toggle();break;case 39:b.fullwidthAudioPlayer.next();break;case 37:b.fullwidthAudioPlayer.previous();break;case 38:b.fullwidthAudioPlayer.volume(aq/100+0.05);break;case 40:b.fullwidthAudioPlayer.volume(aq/100-0.05)}});aC.children("p").css("marginLeft",aO.coverSize[0]+10);az.trigger("onFapReady");an=!0;b(".fap-enqueue-track").each(function(k,g){var j=b(g);jQuery.fullwidthAudioPlayer.addTrack(j.attr("href"),j.attr("title"),b("body").find(j.data("meta")).html(),j.attr("rel"),j.attr("target"),!1)});az.bind("fap-tracks-stored",function(j,g){ab&&aM(g,ab)});aM(0,aO.autoPlay);aO.autoPlay?az.trigger("onFapPlay"):az.trigger("onFapPause")}}).trigger("fap-tracks-stored")}function ax(f){var e='<a href="'+f.attr("href")+'" title="'+(f.attr("title")?f.attr("title"):"")+'" target="'+(f.attr("target")?f.attr("target"):"")+'" rel="'+(f.attr("rel")?f.attr("rel"):"")+'" data-meta="'+(f.data("meta")?f.data("meta"):"")+'"></a>';if(f.data("meta")){var g=b("body").find(f.data("meta")).html()?b("body").find(f.data("meta")).html():"",e=e+('<span id="'+f.data("meta").substring(1)+'">'+g+"</span>")}return e}function ay(c){b.getJSON((/api\./.test(c)?c+"?":"http://api.soundcloud.com/resolve?url="+c+"&")+"format=json&consumer_key="+aa+"&callback=?",function(g){var l=0,j=0;if(g.tracks){for(var k=0;k<g.tracks.length;++k){j=aH(g.tracks[k]),l=j<l?j:l,0==k&&(l=j)}}else{if(g.duration){g.permalink_url=c,l=aH(g)}else{if(g.username){return/favorites/.test(c)?ay(g.uri+"/favorites"):ay(g.uri+"/tracks"),!1}if(b.isArray(g)){for(k=0;k<g.length;++k){j=aH(g[k]),l=j<l?j:l,0==k&&(l=j)}}}}az.trigger("onFapTracksAdded",[aJ]);az.trigger("fap-tracks-stored",[l])})}function aH(f){for(var c=aJ.length,e=0;e<aJ.length;++e){if(f.title==aJ[e].title){return c=e}}aJ.push(f);au(f.artwork_url,f.title);return c}function aM(l,g){if(0>=aJ.length){return b.fullwidthAudioPlayer.clear(),!1}if(am&&!ag||l==aI){return !1}aI=0>l?aJ.length-1:l==aJ.length?0:l;ap=!g;var m=/http:\/\/soundcloud/.test(aJ[aI].permalink_url);m&&!ag&&(b("body").fapScPlayer({apiKey:aa,autoPlay:g}),b(document).bind("fapScPlayer:onAudioReady",function(){ag=!0;aB.setVolume(aq)}));b.fapScPlayer.html5()&&(ag=!0);aG.find("#fap-progress-bar").width(0);aG.find("#fap-total-time, #fap-current-time").text("00:00:00");aC.children("#fap-current-cover").attr("src",aJ[aI].artwork_url);aC.children("#fap-current-title").html(aJ[aI].title);aC.children("#fap-current-meta").html(m?aJ[aI].genre:aJ[aI].meta);aJ[aI].artwork_url?(aC.children("#fap-current-cover").show(),aC.children("#fap-cover-replacement").hide()):(aC.children("#fap-current-cover").hide(),aC.children("#fap-cover-replacement").show());if(aJ[aI].permalink_url){aC.children("#fap-social-links").children("a").show();var j="http://www.facebook.com/sharer.php?u="+encodeURIComponent(aJ[aI].permalink_url)+"&t="+encodeURIComponent(aJ[aI].title)+"",k="http://twitter.com/share?url="+encodeURIComponent(aJ[aI].permalink_url)+"&text="+encodeURIComponent(aJ[aI].title)+"";aC.find("#fap-social-links a:eq(0)").attr("href",aJ[aI].permalink_url);aC.find("#fap-social-links a:eq(1)").attr("href",aJ[aI].permalink_url+"/download");aC.find("#fap-social-links a:eq(2)").attr("href",j);aC.find("#fap-social-links a:eq(3)").attr("href",k)}else{aC.children("#fap-social-links").children("a").hide()}aD&&(aD.find("#fap-playlist li").css("background","none"),aD.find("#fap-playlist li").eq(aI).css("background","#08c"));g?aG.find("#fap-play-pause").html('<i class="audioplayer icon-pause"></i>'):aG.find("#fap-play-pause").html('<i class="audioplayer icon-play"></i>');aB&&aB.destruct();m?(am||aG.find("#fap-loading-bar").width("100%"),aC.children("#fap-social-links").children("a:eq(0)").show(),aJ[aI].downloadable?aC.children("#fap-social-links").children("a:eq(1)").show():aC.children("#fap-social-links").children("a:eq(1)").hide(),am=!0,aB=b.fapScPlayer,aB.setVolume(aq),aB.load(aJ[aI],g),aB.defaults.whileloading=function(c){0>c&&(c=0);100<c&&(c=100);aG.find("#fap-loading-bar").width(c+"%")},aB.defaults.whileplaying=function(c){i(c,aJ[aI].duration)},aB.defaults.onfinish=al):(aC.children("#fap-social-links").children("a:eq(0), a:eq(1)").hide(),am=!1,aB=soundManager.createSound({id:"fap_sound",url:aJ[aI].stream_url,autoPlay:g,autoLoad:aO.autoLoad,volume:aq,whileloading:ak,whileplaying:af,onfinish:al,onload:ae}));az.trigger("onFapTrackSelect",[aJ[aI]])}function ak(){aG.find("#fap-loading-bar").width(this.bytesLoaded/this.bytesTotal*ai)}function af(){i(this.position,this.duration)}function al(){aO.playNextWhenFinished?b.fullwidthAudioPlayer.next():(b.fullwidthAudioPlayer.pause(),aB.setPosition(0),aL(0))}function ae(c){c||window.console&&window.console.log&&console.log("MP3 file could not be loaded! Please check the URL: "+this.url)}function au(k,g){function l(){var c=aD.find("#fap-playlist li").index(b(this).parent());aM(c,!0)}function j(){var f=b(this),c=f.parent().parent().children("li").index(f.parent());aJ.splice(c,1);f.parent().remove();c==aI?(aI--,c=c==aJ.length?0:c,aM(c,ap?!1:!0)):c<aI&&aI--;ar&&(ar.refresh(),aF.find(".antiscroll-scrollbar").css("backgroundColor",aO.mainColor))}if(!aO.playlist){return !1}var e=k?'<img src="'+k+'" style="border: 1px solid '+aO.strokeColor+';" />':'<div class="fap-cover-replace-small" style="background: '+aO.wrapperColor+"; border: 1px solid "+aO.strokeColor+';"></div>';aD.find("#fap-playlist").append('<li class="clearfix">'+e+"<span>"+g+'</span><div class="fap-remove-track">&times;</div></li>');e=aD.find("#fap-playlist li").last().css({marginBottom:5,height:22});-1==navigator.appVersion.indexOf("MSIE 7.")&&(k||at(e.children(".fap-cover-replace-small").get(0),20,20));"1.7"<=az.jquery?(e.on("click","span",l),e.on("click",".fap-remove-track",j)):(e.delegate("span","click",l),e.delegate(".fap-remove-track","click",j));ar&&(ar.refresh(),aF.find(".antiscroll-scrollbar").css("backgroundColor",aO.mainColor))}function at(f,e,g){b(f).append('<span style="line-height: '+g+"px; color: "+aO.metaColor+';">&hellip;</span>')}function aL(c){aG.find("#fap-progress-bar").width(c*ai)}function i(e,f){var g=h(e/1000);d!=g&&(aG.find("#fap-current-time").text(g),aG.find("#fap-total-time").text(h(f/1000)),aL(e/f));d=g}function h(e){e=Math.abs(e);var g=[];g[0]=Math.floor(e/3600%24);g[1]=Math.floor(e/60%60);g[2]=Math.floor(e%60);e=!0;for(var k=-1,j=0;j<g.length;j++){10>g[j]&&(g[j]="0"+g[j]),"00"==g[j]&&j<g.length-2&&!e?k=j:e=!0}g.splice(0,k+1);return g.join(":")}function Z(){aD&&aD.find("#fap-playlist").empty();if(-1!=aI){var c=aJ[aI].title;aJ.shuffle();o(c);for(c=0;c<aJ.length;++c){au(aJ[c].artwork_url,aJ[c].title)}aF.find("#fap-playlist-wrapper #fap-playlist").find("li").eq(aI).css("backgroundColor",aO.fillColor);aF.find("#fap-playlist-wrapper").scrollTop(0)}else{aJ.shuffle();for(c=0;c<aJ.length;++c){au(aJ[c].artwork_url,aJ[c].title)}}}function o(c){for(var e=0;e<aJ.length;++e){aJ[e].title==c&&(aI=e)}}function a(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)}var aO=b.extend({},b.fn.fullwidthAudioPlayer.defaults,aA),az,aw,aF,aG,aC,aD=null,ar,aB,d,av=0,ad=-1,ai=180,ac=50,aI=-1,aq=100,ap,an,ag=!1,am=!1,ah=!1,ab=!1,aj=!1,ao=!1,aa="d2be7a47322c293cdaffc039a26e05d1",aJ=[];b.fullwidthAudioPlayer.play=function(){0<aJ.length&&(aB.playState?aB.resume():aB.play(),aG.find("#fap-play-pause").html('<i class="audioplayer icon-pause"></i>'),ap=!1,az.trigger("onFapPlay"))};b.fullwidthAudioPlayer.pause=function(){0<aJ.length&&(aB.pause(),aG.find("#fap-play-pause").html('<i class="audioplayer icon-play"></i>'),ap=!0,az.trigger("onFapPause"))};b.fullwidthAudioPlayer.toggle=function(){ap?b.fullwidthAudioPlayer.play():b.fullwidthAudioPlayer.pause()};b.fullwidthAudioPlayer.previous=function(){0<aJ.length&&aM(aI-1,!0)};b.fullwidthAudioPlayer.next=function(){0<aJ.length&&aM(aI+1,!0)};b.fullwidthAudioPlayer.volume=function(c){0<aJ.length&&(0>c&&(c=0),1<c&&(c=1),aq=100*c,aB&&aB.setVolume(aq),aG.find("#fap-volume-progress").width(c*ac))};b.fullwidthAudioPlayer.addTrack=function(B,C,z,A,D,y){if(null==B||""==B){return !1}void 0===C&&(C="");void 0===z&&(z="");void 0===A&&(A="");void 0===D&&(D="");void 0===y&&(y=!1);if(aj&&window.fapPopupWin&&!window.fapPopupWin.closed){return window.fapPopupWin.addTrack(B,C,z,A,D,y),window.fapPopupWin.focus(),!1}if(aO.base64){var x="",w,u,j,v,E,l=0;for(B=B.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<B.length;){w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(B.charAt(l++)),u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(B.charAt(l++)),v="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(B.charAt(l++)),E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(B.charAt(l++)),w=w<<2|u>>4,u=(u&15)<<4|v>>2,j=(v&3)<<6|E,x+=String.fromCharCode(w),64!=v&&(x+=String.fromCharCode(u)),64!=E&&(x+=String.fromCharCode(j))}l="";for(v=c1=c2=B=0;B<x.length;){v=x.charCodeAt(B),128>v?(l+=String.fromCharCode(v),B++):191<v&&224>v?(c2=x.charCodeAt(B+1),l+=String.fromCharCode((v&31)<<6|c2&63),B+=2):(c2=x.charCodeAt(B+1),c3=x.charCodeAt(B+2),l+=String.fromCharCode((v&15)<<12|(c2&63)<<6|c3&63),B+=3)}B=l}ab=y;if(/http:\/\/soundcloud/.test(B)){if(!aa){return alert("Sorry. You need to set a soundcloud API key first. Please read the documentation how to get and set an API key!"),!1}ay(B)}else{C=aH({stream_url:B,title:C,meta:z,artwork_url:A,permalink_url:D}),az.trigger("onFapTracksAdded",[aJ]),az.trigger("fap-tracks-stored",[C])}!aO.opened&&(y&&!ao)&&b.fullwidthAudioPlayer.setPlayerPosition("open",!0)};b.fullwidthAudioPlayer.setPlayerPosition=function(e,f){if(aw.is(":animated")){return !1}"open"==e?(aF.children("#fap-wrapper-switcher").html("<i class='icon-chevron-down'></i>"),"top"==aO.wrapperPosition?aw.animate({top:-(av-aO.height)},f?300:0):aw.animate({bottom:-(av-aO.height)},f?300:0),aO.opened=!0):"close"==e?(aF.children("#fap-wrapper-switcher").html("<i class='icon-volume-up'></i>"),"top"==aO.wrapperPosition?aw.animate({top:-av-1},f?300:0):aw.animate({bottom:-av-1},f?300:0),aO.opened=ah=!1):"openPlaylist"==e?("top"==aO.wrapperPosition?aw.animate({top:0},300):aw.animate({bottom:0},300),ah=!0):"closePlaylist"==e&&("top"==aO.wrapperPosition?aw.animate({top:-(av-aO.height)},300):aw.animate({bottom:-(av-aO.height)},300),ah=!1)};b.fullwidthAudioPlayer.clear=function(){aC.children("#fap-current-cover").hide();aC.children("#fap-cover-replacement").show();aC.children("#fap-current-title, #fap-current-meta").html("");aC.children("#fap-social-links").children("a").attr("href","").hide();aG.find("#fap-progress-bar, #fap-loading-bar").width(0);aG.find("#fap-current-time, #fap-total-time").text("00:00:00");aG.find("#fap-play-pause").html('<i class="audioplayer icon-play"></i>');ap=!0;aI=-1;aD&&aD.find("#fap-playlist").empty();aJ=[];aB&&aB.destruct();ar&&(ar.refresh(),aF.find(".antiscroll-scrollbar").css("backgroundColor",aO.mainColor));az.trigger("onFapClear")};b.fullwidthAudioPlayer.popUp=function(){aj&&(!window.fapPopupWin||window.fapPopupWin.closed?aN("",!1):window.fapPopupWin.focus())};Array.prototype.shuffle=function(){for(var e,f,g=0;g<this.length;g++){f=Math.floor(Math.random()*this.length),e=this[g],this[g]=this[f],this[f]=e}};return this.each(function(){b:{az=b(this);az.hide();ao="fap-popup"==this.id;if(a()){if(aO.hideOnMobile){break b}aO.wrapperPosition="top";aO.autoPlay=aO.volume=aO.playlist=!1}an=Boolean(window.fapPopupWin);aO.autoPopup||(an=!0);ap=!aO.autoPlay;var c=function(){if(!an){return !1}var g=b(this),l=!0;g.data("enqueue")&&(l="yes"==g.data("enqueue")?!1:!0);if(aj){if(g.hasClass("fap-add-playlist")){var g=g.data("playlist"),j=jQuery('ul[data-playlist="'+g+'"]').first().children("li").find(".fap-single-track"),g=ax(b(j.get(0)));if(0==j.size()){return !1}aN(g,l);j.splice(0,1);window.fapReady=void 0!=window.fapPopupWin.addTrack;var k=setInterval(function(){window.fapReady&&(clearInterval(k),j.each(function(e,f){aN(f,!1)}))},50)}else{g=ax(g),aN(g,l)}}else{if(g.hasClass("fap-add-playlist")){g=g.data("playlist");j=jQuery('ul[data-playlist="'+g+'"]').first().children("li").find(".fap-single-track");if(0==j.size()){return !1}j.each(function(e,n){var m=b(n);b.fullwidthAudioPlayer.addTrack(m.attr("href"),m.attr("title"),b("body").find(m.data("meta")).html(),m.attr("rel"),m.attr("target"),0==e&&l)})}else{b.fullwidthAudioPlayer.addTrack(g.attr("href"),g.attr("title"),b("body").find(g.data("meta")).html(),g.attr("rel"),g.attr("target"),l)}}return !1};"1.7"<=az.jquery?(b("body").on("click",".fap-my-playlist li a, .fap-single-track",c),b("body").on("click",".fap-add-playlist",c)):(b("body").delegate(".fap-my-playlist li a, .fap-single-track","click",c),b("body").delegate(".fap-add-playlist","click",c));setTimeout(function(){aj&&(window.fapPopupWin&&!window.fapPopupWin.closed)&&b(".fap-enqueue-track").each(function(e,f){aN(f,!1)})},201);av=aO.playlist?aO.height+aO.playlistHeight+aO.offset:aO.height;"popup"==aO.wrapperPosition&&!ao?(aj=!0,aO.playlist||(av=aO.height),aO.autoPopup&&!window.fapPopupWin&&aN(az.html(),aO.autoPlay)):(c='<div id="fap-wrapper" class="'+("top"==aO.wrapperPosition?"fap-wrapper-top":"fap-wrapper-bottom")+'" style="'+aO.wrapperPosition+": 0; height: "+av+"px; background: "+aO.wrapperColor+"; border-color: "+aO.strokeColor+';"><div id="fap-main" style="color:'+aO.mainColor+';"><div id="fap-wrapper-switcher" style="background: '+aO.wrapperColor+"; border-color: "+aO.strokeColor+'"></div><p id="fap-init-text">Creating Playlist...</p></div></div>',b("body").append(c),aw=b("body").children("#fap-wrapper"),aF=aw.children("#fap-main"),ao&&aw.addClass("fap-popup-skin"),a()&&aw.css({position:"absolute"}),ao?aF.css({marginLeft:10,marginRight:10}):"center"==aO.mainPosition?aF.css({marginLeft:"auto",marginRight:"auto"}):"right"==aO.mainPosition?aF.css({"float":"right",marginRight:10}):aF.css({marginLeft:10}),"top"==aO.wrapperPosition?aF.children("#fap-wrapper-switcher").addClass("fap-bordered-bottom").css({bottom:-16,borderTop:"none"}):aF.children("#fap-wrapper-switcher").addClass("fap-bordered-top").css({top:-41,borderBottom:"none"}),aO.opened?b.fullwidthAudioPlayer.setPlayerPosition("close",!1):b.fullwidthAudioPlayer.setPlayerPosition("close",!1),aF.children("#fap-wrapper-switcher").click(function(){aO.opened?b.fullwidthAudioPlayer.setPlayerPosition("close",!0):b.fullwidthAudioPlayer.setPlayerPosition("open",!0)}),soundManager.onready(aK),soundManager.ontimeout(function(e){alert("SM2 failed to start. Flash missing, blocked or security error? Status: "+e.error.type)}))}})};b.fn.fullwidthAudioPlayer.defaults={wrapperPosition:"bottom",mainPosition:"center",wrapperColor:"#f0f0f0",mainColor:"#3c3c3c",fillColor:"#e3e3e3",metaColor:"#666666",strokeColor:"#e0e0e0",fillColorHover:"#d1d1d1",activeTrackColor:"#E8E8E8",twitterText:"Share on Twitter",facebookText:"Share on Facebook",soundcloudText:"Check on Souncloud",downloadText:"Download",popupUrl:"popup.html",height:70,playlistHeight:210,coverSize:[50,50],offset:20,opened:!0,volume:!0,playlist:!0,autoLoad:!0,autoPlay:!1,playNextWhenFinished:!0,keyboard:!0,socials:!0,autoPopup:!1,randomize:!1,shuffle:!0,sortable:!1,base64:!1,xmlPath:"",xmlPlaylist:"",hideOnMobile:!1}})(jQuery);(function(){var b=/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent);window.soundcloud={version:"0.1",debug:!1,_listeners:[],_redispatch:function(k,j,h){var d,n=this._listeners[k]||[],o="soundcloud:"+k;try{d=this.getPlayer(j)}catch(f){this.debug&&window.console&&console.error("unable to dispatch widget event "+k+" for the widget id "+j,h,f);return}window.jQuery?jQuery(d).trigger(o,[h]):window.Prototype&&$(d).fire(o,h);for(var i=0,m=n.length;i<m;i+=1){n[i].apply(d,[d,h])}this.debug&&window.console&&console.log(o,k,j,h)},addEventListener:function(d,e){this._listeners[d]||(this._listeners[d]=[]);this._listeners[d].push(e)},removeEventListener:function(e,i){for(var f=this._listeners[e]||[],h=0,d=f.length;h<d;h+=1){f[h]===i&&f.splice(h,1)}},getPlayer:function(a){var e;try{if(!a){throw"The SoundCloud Widget DOM object needs an id atribute, please refer to SoundCloud Widget API documentation."}if(e=b?window[a]:document[a]){if(e.api_getFlashId){return e}throw"The SoundCloud Widget External Interface is not accessible. Check that allowscriptaccess is set to 'always' in embed code"}throw"The SoundCloud Widget with an id "+a+" couldn't be found"}catch(d){throw console&&console.error&&console.error(d),d}},onPlayerReady:function(d,e){this._redispatch("onPlayerReady",d,e)},onMediaStart:function(d,e){this._redispatch("onMediaStart",d,e)},onMediaEnd:function(d,e){this._redispatch("onMediaEnd",d,e)},onMediaPlay:function(d,e){this._redispatch("onMediaPlay",d,e)},onMediaPause:function(d,e){this._redispatch("onMediaPause",d,e)},onMediaBuffering:function(d,e){this._redispatch("onMediaBuffering",d,e)},onMediaSeek:function(d,e){this._redispatch("onMediaSeek",d,e)},onMediaDoneBuffering:function(d,e){this._redispatch("onMediaDoneBuffering",d,e)},onPlayerError:function(d,e){this._redispatch("onPlayerError",d,e)}}})();(function(o){var x=o(document),n=function(e){try{window.console&&window.console.log&&window.console.log.apply(window.console,arguments)}catch(g){}},h,b=!1;try{var r=new Audio,b=(b=r.canPlayType&&/maybe|probably/.test(r.canPlayType("audio/mpeg")))&&/iPad|iphone|mobile|pre\//i.test(navigator.userAgent)}catch(u){}callbacks={onReady:function(){x.trigger("fapScPlayer:onAudioReady")},onPlay:function(){x.trigger("fapScPlayer:onMediaPlay")},onPause:function(){x.trigger("fapScPlayer:onMediaPause")},onEnd:function(){x.trigger("fapScPlayer:onMediaEnd")},onBuffer:function(c){x.trigger({type:"fapScPlayer:onMediaBuffering",percent:c})}};if(b){var f=new Audio;o('<div class="sc-player-engine-container"></div>').appendTo(document.body).append(f);f.addEventListener("play",callbacks.onPlay,!1);f.addEventListener("pause",callbacks.onPause,!1);f.addEventListener("ended",callbacks.onEnd,!1);f.addEventListener("timeupdate",function(e){e=e.target;var g=100*((e.buffered.length&&e.buffered.end(0))/e.duration);callbacks.onBuffer(g);if(e.currentTime===e.duration){callbacks.onEnd()}},!1);f.addEventListener("progress",function(c){c=c.target;c=100*((c.buffered.length&&c.buffered.end(0))/c.duration);callbacks.onBuffer(c)},!1);b={load:function(e,g){f.pause();f.src=e.stream_url+"?consumer_key="+g;f.load();f.play()},play:function(){f.play()},pause:function(){f.pause()},stop:function(){f.currentTime&&(f.currentTime=0);f.pause()},seek:function(c){f.currentTime=f.duration*c;f.play()},getDuration:function(){return 1000*f.duration},getPosition:function(){return 1000*f.currentTime},setVolume:function(c){f&&(f.volume=c/100)},html5:!0}}else{var k,q=function(c){c="http://player.soundcloud.com/player.swf?url="+c+"&amp;enable_api=true&amp;player_type=engine&amp;object_id=fapScPlayerEngine";return/MSIE (\d+\.\d+);/.test(navigator.userAgent)?'<object height="100%" width="100%" id="fapScPlayerEngine" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="'+c+'"><param name="movie" value="'+c+'" /><param name="allowscriptaccess" value="always" /></object>':'<object height="100%" width="100%" id="fapScPlayerEngine"><embed allowscriptaccess="always" height="100%" width="100%" src="'+c+'" type="application/x-shockwave-flash" name="fapScPlayerEngine" /></object>'};soundcloud.addEventListener("onPlayerReady",function(){k=soundcloud.getPlayer("fapScPlayerEngine");callbacks.onReady()});soundcloud.addEventListener("onMediaEnd",callbacks.onEnd);soundcloud.addEventListener("onMediaBuffering",function(e,g){callbacks.onBuffer(g.percent)});soundcloud.addEventListener("onMediaPlay",callbacks.onPlay);soundcloud.addEventListener("onMediaPause",callbacks.onPause);b={load:function(a){a=a.permalink_url;k?k.api_load(a):o('<div class="sc-player-engine-container"></div>').appendTo(document.body).html(q(a))},play:function(){k&&k.api_play()},pause:function(){k&&k.api_pause()},stop:function(){k&&k.api_stop()},seek:function(c){k&&k.api_seekTo(k.api_getTrackDuration()*c)},getDuration:function(){return k&&k.api_getTrackDuration&&1000*k.api_getTrackDuration()},getPosition:function(){return k&&k.api_getTrackPosition&&1000*k.api_getTrackPosition()},setVolume:function(c){k&&k.api_setVolume&&k.api_setVolume(c)},html5:!1}}h=b;var j,s,i=!1,m=!1,d;o.fapScPlayer=function(a){a=o.extend({},o.fapScPlayer.defaults,a);j=a.apiKey;s=a.autoPlay};o.fapScPlayer.html5=function(){return h.html5};o.fapScPlayer.load=function(g,a){m=!a;h.stop();h.load(g,j);o.fapScPlayer.duration=g.duration};o.fapScPlayer.play=function(){m=!1;h.play()};o.fapScPlayer.pause=function(){m=!0;h.pause()};o.fapScPlayer.stop=function(){m=!0;h.stop()};o.fapScPlayer.setPosition=function(c){h.seek(c)};o.fapScPlayer.setVolume=function(c){h.setVolume(c)};o.fapScPlayer.destruct=function(){m=!0;h.pause();h.stop()};x.bind("fapScPlayer:onAudioReady",function(){h.html5?n("Soundcloud Player HTML5: audio engine is ready"):n("Soundcloud Player Flash: audio engine is ready");i||!m?h.play():s?h.play():h.pause();i=!0}).bind("fapScPlayer:onMediaPlay",function(){clearInterval(d);if(m){return h.stop(),!1}d=setInterval(function(){var g=h.getDuration(),a=h.getPosition();o.fapScPlayer.defaults.whileplaying(a,g)},500)}).bind("fapScPlayer:onMediaPause",function(){clearInterval(d);d=null}).bind("fapScPlayer:onVolumeChange",function(){}).bind("fapScPlayer:onMediaEnd",function(){o.fapScPlayer.defaults.onfinish()}).bind("fapScPlayer:onMediaBuffering",function(a){o.fapScPlayer.defaults.whileloading(a.percent+1)});o.fn.fapScPlayer=function(a){this.each(function(){o.fapScPlayer(a,this)});return this};o.fapScPlayer.defaults=o.fn.fapScPlayer.defaults={whileloading:function(){},whileplaying:function(){},onfinish:function(){},apiKey:"LFSDttxBaGVSYZfSitrA",autoPlay:!0}})(jQuery);(function(d){function e(g,a){this.el=d(g);this.options=a||{};this.x=!1!==this.options.x;this.y=!1!==this.options.y;this.padding=void 0==this.options.padding?2:this.options.padding;this.inner=this.el.find(".antiscroll-inner");this.inner.css({width:"+="+h(),height:"+="+h()});this.refresh()}function i(a){this.pane=a;this.pane.el.append(this.el);this.innerEl=this.pane.inner.get(0);this.shown=this.enter=this.dragging=!1;this.pane.el.mouseenter(d.proxy(this,"mouseenter"));this.pane.el.mouseleave(d.proxy(this,"mouseleave"));this.el.mousedown(d.proxy(this,"mousedown"));this.pane.inner.scroll(d.proxy(this,"scroll"));this.pane.inner.bind("mousewheel",d.proxy(this,"mousewheel"));a=this.pane.options.initialDisplay;!1!==a&&(this.show(),this.hiding=setTimeout(d.proxy(this,"hide"),parseInt(a,10)||3000))}function f(g,k){function j(){}j.prototype=k.prototype;g.prototype=new j}function h(){if(void 0===b){var j=d('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');d("body").append(j);var a=d("div",j).innerWidth();j.css("overflow-y","scroll");var g=d("div",j).innerWidth();d(j).remove();b=a-g}return b}d.fn.antiscroll=function(a){return this.each(function(){d(this).data("antiscroll")&&d(this).data("antiscroll").destroy();d(this).data("antiscroll",new d.Antiscroll(this,a))})};d.Antiscroll=e;e.prototype.refresh=function(){var g=this.inner.get(0).scrollWidth>this.el.width(),c=this.inner.get(0).scrollHeight>this.el.height();!this.horizontal&&g&&this.x?this.horizontal=new i.Horizontal(this):this.horizontal&&!g&&(this.horizontal.destroy(),this.horizontal=null);!this.vertical&&c&&this.y?this.vertical=new i.Vertical(this):this.vertical&&!c&&(this.vertical.destroy(),this.vertical=null)};e.prototype.destroy=function(){this.horizontal&&this.horizontal.destroy();this.vertical&&this.vertical.destroy();return this};e.prototype.rebuild=function(){this.destroy();this.inner.attr("style","");e.call(this,this.el,this.options);return this};i.prototype.destroy=function(){this.el.remove();return this};i.prototype.mouseenter=function(){this.enter=!0;this.show()};i.prototype.mouseleave=function(){this.enter=!1;this.dragging||this.hide()};i.prototype.scroll=function(){this.shown||(this.show(),!this.enter&&!this.dragging&&(this.hiding=setTimeout(d.proxy(this,"hide"),1500)));this.update()};i.prototype.mousedown=function(j){j.preventDefault();this.dragging=!0;this.startPageY=j.pageY-parseInt(this.el.css("top"),10);this.startPageX=j.pageX-parseInt(this.el.css("left"),10);document.onselectstart=function(){return !1};var a=d.proxy(this,"mousemove"),g=this;d(document).mousemove(a).mouseup(function(){g.dragging=!1;document.onselectstart=null;d(document).unbind("mousemove",a);g.enter||g.hide()})};i.prototype.show=function(){this.shown||(this.update(),this.el.addClass("antiscroll-scrollbar-shown"),this.hiding&&(clearTimeout(this.hiding),this.hiding=null),this.shown=!0)};i.prototype.hide=function(){this.shown&&(this.el.removeClass("antiscroll-scrollbar-shown"),this.shown=!1)};i.Horizontal=function(a){this.el=d('<div class="antiscroll-scrollbar antiscroll-scrollbar-horizontal">');i.call(this,a)};f(i.Horizontal,i);i.Horizontal.prototype.update=function(){var g=this.pane.el.width(),k=g-2*this.pane.padding,j=this.pane.inner.get(0);this.el.css("width",k*g/j.scrollWidth).css("left",k*j.scrollLeft/j.scrollWidth)};i.Horizontal.prototype.mousemove=function(j){var m=this.pane.el.width()-2*this.pane.padding,l=j.pageX-this.startPageX;j=this.el.width();var k=this.pane.inner.get(0),l=Math.min(Math.max(l,0),m-j);k.scrollLeft=(k.scrollWidth-this.pane.el.width())*l/(m-j)};i.Horizontal.prototype.mousewheel=function(g,k,j){if(0>j&&0==this.pane.inner.get(0).scrollLeft||0<j&&this.innerEl.scrollLeft+this.pane.el.width()==this.innerEl.scrollWidth){return g.preventDefault(),!1}};i.Vertical=function(a){this.el=d('<div class="antiscroll-scrollbar antiscroll-scrollbar-vertical">');i.call(this,a)};f(i.Vertical,i);i.Vertical.prototype.update=function(){var g=this.pane.el.height(),k=g-2*this.pane.padding,j=this.innerEl;this.el.css("height",k*g/j.scrollHeight).css("top",k*j.scrollTop/j.scrollHeight)};i.Vertical.prototype.mousemove=function(j){var n=this.pane.el.height(),m=n-2*this.pane.padding,k=j.pageY-this.startPageY;j=this.el.height();var l=this.innerEl,k=Math.min(Math.max(k,0),m-j);l.scrollTop=(l.scrollHeight-n)*k/(m-j)};i.Vertical.prototype.mousewheel=function(j,m,l,k){if(0<k&&0==this.innerEl.scrollTop||0>k&&this.innerEl.scrollTop+this.pane.el.height()==this.innerEl.scrollHeight){return j.preventDefault(),!1}};var b})(jQuery);