(function(){
  "use strict";
  var W = ["日","一","二","三","四","五","六"];
  var WEN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var MONEN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var ZNUM = "〇一二三四五六七八九";
  // 12 时辰 -> hour ranges (子 starts 23:00)
  var SHI = [["子","23–01"],["丑","01–03"],["寅","03–05"],["卯","05–07"],
             ["辰","07–09"],["巳","09–11"],["午","11–13"],["未","13–15"],
             ["申","15–17"],["酉","17–19"],["戌","19–21"],["亥","21–23"]];

  // ---- 术语释义词典 (轻点查看) ----
  var GLOSS = {
    "黄道吉日":"古人把每天轮值的「十二值神」分为黄道（青龙·明堂·金匮·天德·玉堂·司命，主吉）与黑道（天刑·朱雀·白虎·天牢·玄武·勾陈，主凶）。当日值神属黄道，即为黄道吉日，办事较为顺遂。",
    "值神":"当日轮值主事的神煞，决定一天整体的吉凶基调，十二位循环往复，是判断黄道/黑道的依据。",
    "建除":"建·除·满·平·定·执·破·危·成·收·开·闭十二字逐日轮值，各主不同宜忌：如「除日」宜扫除除旧，「成日」诸事易成，「破日」多不宜办大事。",
    "纳音":"由干支推算出的五行属性（如炉中火、海中金、大林木），共三十种，用来概括当日的五行气场。",
    "九星":"一白·二黑·三碧·四绿·五黄·六白·七赤·八白·九紫九颗飞星逐日飞临，配合方位与五行，常用于风水择吉。",
    "星宿":"二十八宿之一。古人沿黄道把恒星分为二十八组逐日轮值，各有吉凶与所宜所忌，后标注的（吉/凶）即该宿当日的总评。",
    "胎神":"传统认为胎神每日停驻在家中某一方位。孕妇之家忌在该方位动土、钉钉或挪动家具，以免冲撞胎气。",
    "彭祖百忌":"托名长寿仙人彭祖流传的逐日禁忌口诀，按当日天干、地支各列一句提醒，如「卯不穿井」。",
    "冲煞":"「冲」指当日地支与某生肖相冲，传统认为该属相者当天宜低调避让；「煞」为相伴的凶方（如煞西），指当日不宜面向或前往的方位。",
    "吉神宜趋":"当日降临的吉神，宜顺应、亲近，多利办喜庆与正事。",
    "凶煞宜忌":"当日出现的凶煞名目，宜回避、忌触犯，办事需避其锋。",
    "月相":"月亮盈亏的阶段（朔·上弦·望·下弦等），对应农历的日序变化。",
    "吉神方位":"当日喜神、财神、福神所在的方位。传统择吉中，宜朝这些方向行事、安坐或出行。",
    "时辰":"古人把一昼夜分为十二时辰，每个约两小时（如子时 23–01 点）。每个时辰也各有吉/凶与宜忌，可择时办事。",
    // 常见宜忌用语
    "祭祀":"祭拜神明、祖先的仪式。","祈福":"向神明祈求福分、许愿或还愿。","求嗣":"向神明祈求子嗣。",
    "开光":"为新塑的神像、佛像点眼、注入灵气的仪式。","出火":"迁移神位、香火的仪式。","谢土":"建宅完工后祭谢土地神。",
    "出行":"外出远行、旅游。","嫁娶":"结婚、举办婚礼。","纳采":"婚嫁中男方向女方提亲、送聘的礼节。","订盟":"订婚、文定。",
    "入宅":"迁入新居、乔迁。","移徙":"搬家、迁移住所。","安床":"安放或移动床铺的位置。",
    "动土":"阳宅建筑工程破土开工。","破土":"专指阴宅（坟墓）动工，与阳宅的「动土」不同。","安葬":"举行下葬、安棺之礼。",
    "修造":"修缮、建造房屋。","竖柱上梁":"房屋立柱、架设大梁。","栽种":"种植作物、花木。",
    "纳财":"收进钱财、置办产业。","开市":"商铺开业、新店开张营业。","交易":"进行买卖。","立券":"订立契约、签订合同。",
    "纳畜":"买进、收养牲畜。","牧养":"放牧、饲养牲畜。","捕捉":"捕捉禽兽、除虫除害。","结网":"编结渔网，引申宜做收纳、编织等小事。",
    "解除":"打扫清洁、解除秽气、消灾去厄。","沐浴":"斋戒沐浴、净身。","扫舍":"打扫房屋庭院。","扫舍宇":"打扫房屋庭院。",
    "平治道涂":"修整、铺平道路。","余事勿取":"除已列出的宜事外，其余事情皆不宜办。","馀事勿取":"除已列出的宜事外，其余事情皆不宜办。",
    "诸事不宜":"当日不宜办理任何要事，宜静守。","会亲友":"探访、宴请亲友。","订婚":"举行订婚之礼。","求医":"求诊、治病。",
    "治病":"就医、治疗疾病。","词讼":"打官司、提起诉讼。","行丧":"办理丧事。","破屋坏垣":"拆除旧屋、墙垣。","作灶":"安置、修砌炉灶。",
    "开渠":"开挖水渠。","掘井":"挖掘水井。","造畜稠":"搭建牲畜棚圈。","进人口":"收纳家庭新成员（如雇人、收养）。",
    // 凶煞（凶煞宜忌）常见名目
    "河魁":"凶神，主破败、阻滞，忌出行、嫁娶、动土等大事。",
    "大时":"又称大败，凶神，主败损，忌出师、兴造、嫁娶。",
    "大败":"凶神（即大时之凶），主事多败损，忌兴造、婚嫁、开市。",
    "咸池":"俗称桃花煞，凶神，主酒色情欲，忌婚嫁、远行。",
    "九坎":"凶神，主险陷，忌修堤筑堰、行船、栽种、捕猎。",
    "九焦":"与九坎相伴的凶神，忌栽种、修灶、铸造、烧窑。",
    "血忌":"凶神，主流血，忌针灸、动刀、手术、宰杀。",
    "往亡":"凶神，主有去无回，忌出行、赴任、远征、嫁娶。",
    "复日":"凶神，主事情重复，尤忌丧葬，恐有重丧之虞。",
    "重日":"凶神，吉凶之事皆易重复，忌嫁娶、安葬。",
    "月破":"大凶，与月建相冲之日，诸事不宜。",
    "大耗":"凶神，主大量耗损，忌开市、交易、求财。",
    "小耗":"凶神，主小额破财，忌纳财、置产。",
    "灾煞":"凶神，主灾病祸患，忌动土、出行、就医。",
    "天火":"凶神，主火灾，忌盖屋、苫盖、修灶。",
    "地火":"凶神，主旱、虫害，忌栽种。",
    "月厌":"凶神，主厌秽，忌出行、嫁娶、移徙。",
    "月刑":"凶神，主刑伤，忌词讼、出行。",
    "月害":"凶神，主妨害，忌求财、合作、结亲。",
    "月煞":"凶神，主肃杀，忌栽种、养畜、嫁娶。",
    "月虚":"凶神，主空耗，忌开仓、出财。",
    "劫煞":"凶神，主劫夺，忌出行、求财、动土。",
    "灾煞日":"主灾患之日，宜避动土出行。",
    "五虚":"凶神，主虚耗，忌开仓、纳财。",
    "土符":"凶神，主土气，忌动土、修造、掘井。",
    "归忌":"凶神，忌远归、搬家、嫁娶（不宜回门归宁）。",
    "天罡":"凶神，主刚暴阻滞，诸事宜避。",
    "死神":"凶神，忌问病、求医、嫁娶。",
    "受死":"大凶，又名「天地转杀」，百事忌，唯宜捕猎。",
    "游祸":"凶神，忌祭祀、祈福、服药。",
    "五离":"凶神，主离散，忌结亲、立约、和合之事。",
    "勾陈":"黑道凶神，主牵连勾留，诸事宜慎。",
    "元武":"即玄武，黑道凶神，主盗失，宜防小人。",
    "白虎":"黑道凶神，主伤丧、官非，宜避兴造。",
    "天刑":"黑道凶神，主刑罚，忌词讼。",
    "朱雀":"黑道凶神，主口舌是非，宜防争讼。",
    "天牢":"黑道凶神，主拘系，宜避远行、签约。",
    "触水龙":"凶神，忌乘船、捕鱼、临水之事。",
    "八专":"凶神，忌嫁娶、远行。",
    "四击":"凶神，忌出师、争斗。",
    "血支":"凶神，忌针灸、见血、宰杀。",
    "天贼":"凶神，主盗失，忌开仓、出货、远行。",
    // 吉神（吉神宜趋）常见名目
    "天恩":"吉神，上天施恩之日，宜行赏、施惠、庆赏、恤孤。",
    "母仓":"吉神，主滋养，宜栽种、养畜、纳财积仓。",
    "续世":"吉神，主延续后嗣，宜祈嗣、婚姻、求医。",
    "五合":"吉神，主和合，宜结婚、交易、立券、会友。",
    "鸣吠":"吉神，宜破土、安葬。","鸣吠对":"吉神，与「鸣吠」相对，宜破土、安葬。",
    "天德":"上吉之神，能解众凶，诸事皆宜。",
    "月德":"吉神，主福德，宜兴造、祈福、修缮。",
    "天德合":"吉神，与天德相合，宜祈福、结亲、营建。",
    "月德合":"吉神，与月德相合，宜婚嫁、修造。",
    "天医":"吉神，主医药，宜求医、问诊、服药。",
    "天赦":"大吉之神，能赦罪解厄，百无禁忌。",
    "三合":"吉神，地支三合之日，宜结盟、婚姻、合作。",
    "六合":"吉神，主和合，宜嫁娶、立约、交易。",
    "天愿":"吉神，主遂愿，诸事多吉。",
    "月恩":"吉神，主恩泽，宜祈福、营建。",
    "四相":"吉神，当令旺气，宜兴造、栽种。",
    "时德":"吉神，主时运之德，宜庆贺、施惠。",
    "福生":"吉神，主纳福，宜祭祀、祈福。",
    "益后":"吉神，主利于后嗣，宜祈嗣、婚姻。",
    "守日":"吉神，宜册命、上官、嫁娶。",
    "民日":"吉神，宜宴会、嫁娶、营建。",
    "不将":"吉神，嫁娶上吉之日，主夫妻和顺。",
    "圣心":"吉神，宜祭祀、祈福、求嗣。",
    "除神":"吉神，宜扫除、解除、疗病。",
    "青龙":"黄道吉神，主喜庆贵人，诸事多吉。",
    "明堂":"黄道吉神，主光明，宜见贵、上任。",
    "金匮":"黄道吉神，主财富婚姻，宜嫁娶、纳财。",
    "司命":"黄道吉神，宜祭祀、修造，主福禄。",
    "天仓":"吉神，主仓廪丰盈，宜纳财、积仓、纳畜。",
    "要安":"吉神，主平安，宜安抚、休养。",
    "玉宇":"吉神，宜修造、营建。","金堂":"吉神，宜营建、动土、安宅。",
    "普护":"吉神，宜祭祀、祈福、出行。","福德":"吉神，主福德，宜祈福、营建、庆贺。",
    "天巫":"吉神，宜祭祀、祈福、求医。","解神":"吉神，主消灾解纷，宜解除、雪冤。",
    "五富":"吉神，主财丰，宜开市、纳财、经营。","天马":"吉神，主迁动顺利，宜出行、迁徙。"
  };

  // representative world timezones (IANA) for the "global" picker
  var ZONES = [
    ["本地时区 (Local)",""],
    ["北京 / 上海  UTC+8","Asia/Shanghai"],
    ["香港  UTC+8","Asia/Hong_Kong"],
    ["台北  UTC+8","Asia/Taipei"],
    ["东京  UTC+9","Asia/Tokyo"],
    ["新加坡  UTC+8","Asia/Singapore"],
    ["柏林  UTC+1/2","Europe/Berlin"],
    ["伦敦  UTC+0/1","Europe/London"],
    ["巴黎  UTC+1/2","Europe/Paris"],
    ["纽约  UTC−5/4","America/New_York"],
    ["洛杉矶  UTC−8/7","America/Los_Angeles"],
    ["悉尼  UTC+10/11","Australia/Sydney"],
    ["迪拜  UTC+4","Asia/Dubai"]
  ];

  var tzSel = document.getElementById("tz");
  ZONES.forEach(function(z,i){
    var o=document.createElement("option"); o.value=z[1]; o.textContent=z[0];
    if(i===0)o.selected=true; tzSel.appendChild(o);
  });

  function zhYear(n){ n=""+n; var s=""; for(var i=0;i<n.length;i++)s+=ZNUM[+n[i]]; return s; }

  // y/m/d for "today" inside a given IANA timezone
  function ymdInZone(tz){
    var d=new Date();
    if(!tz) return [d.getFullYear(), d.getMonth()+1, d.getDate()];
    try{
      var p=new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit"})
        .formatToParts(d).reduce(function(a,x){a[x.type]=x.value;return a;},{});
      return [+p.year,+p.month,+p.day];
    }catch(e){ return [d.getFullYear(), d.getMonth()+1, d.getDate()]; }
  }
  // current hour in zone -> 时辰 index (0..11)
  function shiIndexInZone(tz){
    var d=new Date(), h;
    if(!tz){ h=d.getHours(); }
    else{
      try{ h=+new Intl.DateTimeFormat("en-GB",{timeZone:tz,hour:"2-digit",hour12:false}).format(d).slice(0,2); }
      catch(e){ h=d.getHours(); }
    }
    return Math.floor(((h+1)%24)/2); // 23,0 ->子(0)
  }

  var pickedSel=null; // user-selected 时辰 index override
  var actTab=0;       // active tab on mobile: 0 详情 / 1 神煞 / 2 时辰

  function esc(s){ return (""+s).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];}); }
  function listHTML(arr){
    if(!arr||!arr.length||(arr.length===1&&(arr[0]==="无"||arr[0]==="馀事勿取"&&arr.length===1)))
      {/*keep*/}
    arr=(arr&&arr.length)?arr:["无"];
    return arr.slice(0,11).map(function(x){return '<span class="gl" data-g="'+esc(x)+'">'+esc(x)+"</span>";}).join("");
  }
  // render an array as individually tappable glossary terms (separated by spaces)
  function glList(arr){
    arr=(arr&&arr.length)?arr:["无"];
    return arr.map(function(x){return '<span class="gl" data-g="'+esc(x)+'">'+esc(x)+'</span>';}).join("　");
  }

  function render(y,m,d){
    var solar = Solar.fromYmd(y,m,d);
    var L = solar.getLunar();
    var ts = L.getDayTianShenType();      // 黄道 / 黑道
    var luck = L.getDayTianShenLuck();     // 吉 / 凶
    var auspicious = (ts==="黄道");
    var w = solar.getWeek();

    var yi = L.getDayYi(), ji = L.getDayJi();
    var nine = L.getDayNineStar().toString();
    var xiu = L.getXiu()+L.getZheng()+L.getAnimal()+"("+L.getXiuLuck()+")";
    var tai = (L.getDayPositionTaiDesc&&L.getDayPositionTaiDesc())||L.getDayPositionTai();

    var sIdx = (pickedSel!=null)? pickedSel : curShi;
    var times = L.getTimes();
    // times[0] is 早子时; map 时辰 index -> times entry (i+1), 子 uses index 1
    function timeObj(i){ return times[i+1] || times[0]; }

    var scCells = SHI.map(function(s,i){
      var t=timeObj(i);
      var good = t.getTianShenType()==="黄道";
      return '<div class="sc-cell'+(i===sIdx?' now':'')+'" data-i="'+i+'">'+
             '<div class="zhi">'+s[0]+'</div><span class="hr">'+s[1]+'</span>'+
             '<div class="lk '+(good?'good':'bad')+'">'+(good?'吉':'凶')+'</div></div>';
    }).join("");

    var st = timeObj(sIdx);
    var scDetail = '<b>'+SHI[sIdx][0]+'时 '+esc(st.getGanZhi())+'</b> · '+
      '<i>'+esc(st.getTianShenType())+esc(st.getTianShen())+'</i>　'+
      '宜 <em>'+esc((st.getYi()||["无"]).slice(0,6).join(" "))+'</em>　'+
      '忌 <i>'+esc((st.getJi()||["无"]).slice(0,6).join(" "))+'</i>';

    var pj = L.getPengZuGan()+" · "+L.getPengZuZhi();

    var html =
    '<div class="holes">'+
      '<i class="dot'+(actTab===0?' on':'')+'" data-t="0" title="详情"></i>'+
      '<i class="dot'+(actTab===1?' on':'')+'" data-t="1" title="神煞"></i>'+
      '<i class="dot'+(actTab===2?' on':'')+'" data-t="2" title="时辰"></i>'+
    '</div>'+
    '<div class="top">'+
      '<div class="datecol">'+
        '<div class="ym">'+y+'年 '+m+'月<span class="en">'+MONEN[m-1]+' '+y+'</span></div>'+
        '<div class="bignum">'+d+'</div>'+
        '<div class="week">星期'+W[w]+'<span class="en">'+WEN[w]+'</span></div>'+
        '<div class="lunar">'+zhYear(L.getYear())+'年 '+L.getMonthInChinese()+'月'+L.getDayInChinese()+'</div>'+
        '<div class="ganzhi">'+L.getYearInGanZhi()+'年 '+L.getMonthInGanZhi()+'月 '+L.getDayInGanZhi()+'日</div>'+
        '<div class="tags"><span class="tag">属'+L.getYearShengXiao()+'</span>'+
          '<span class="tag">'+solar.getXingZuo()+'座</span>'+
          '<span class="tag">'+esc(L.getYueXiang())+'</span></div>'+
      '</div>'+
      '<div class="yiji">'+
        '<div class="col yi"><h3><span class="seal">宜</span><span class="lab">GOOD&nbsp;FOR</span></h3>'+
          '<div class="items">'+listHTML(yi)+'</div></div>'+
        '<div class="col ji"><h3><span class="seal">忌</span><span class="lab">AVOID</span></h3>'+
          '<div class="items '+((ji&&ji[0]==="无")?'muted':'')+'">'+listHTML(ji)+'</div></div>'+
        '<div class="stamp gl'+(auspicious?'':' bad')+'" data-g="黄道吉日"><div><b>'+(auspicious?'黄道<br>吉日':'黑道<br>'+luck+'日')+'</b>'+
          '<small>'+esc(L.getDayTianShen())+'·'+esc(ts)+'</small></div></div>'+
      '</div>'+
    '</div>'+

    '<div class="tabs" role="tablist">'+
      '<button class="tab'+(actTab===0?' on':'')+'" data-t="0">详情<small>Almanac</small></button>'+
      '<button class="tab'+(actTab===1?' on':'')+'" data-t="1">神煞<small>Spirits</small></button>'+
      '<button class="tab'+(actTab===2?' on':'')+'" data-t="2">时辰<small>Hours</small></button>'+
    '</div>'+
    '<section class="panel'+(actTab===0?' on':'')+'" data-p="0">'+
    '<div class="meta">'+
      '<div class="cell"><div class="k gl" data-g="冲煞">冲 煞</div><div class="v">冲<em>'+esc(L.getDayChongDesc())+'</em> 煞'+esc(L.getDaySha())+'</div></div>'+
      '<div class="cell"><div class="k gl" data-g="值神">值神 · <span class="gl" data-g="建除">建除</span></div><div class="v">'+esc(L.getDayTianShen())+'('+esc(ts)+') / '+esc(L.getZhiXing())+'日</div></div>'+
      '<div class="cell"><div class="k gl" data-g="纳音">五行 · 纳音</div><div class="v">'+esc(L.getDayNaYin())+'</div></div>'+
      '<div class="cell"><div class="k gl" data-g="九星">九星</div><div class="v">'+esc(nine)+'</div></div>'+
      '<div class="cell wide"><div class="k gl" data-g="星宿">星宿</div><div class="v">'+esc(xiu)+'</div></div>'+
      '<div class="cell"><div class="k gl" data-g="月相">月相</div><div class="v">'+esc(L.getYueXiang())+'</div></div>'+
      '<div class="cell"><div class="k gl" data-g="胎神">胎神占方</div><div class="v">'+esc(tai)+'</div></div>'+
      '<div class="cell wide"><div class="k gl" data-g="吉神方位">吉神方位</div><div class="v">喜神'+esc(L.getDayPositionXiDesc())+
        '　财神'+esc(L.getDayPositionCaiDesc())+'　福神'+esc(L.getDayPositionFuDesc())+'</div></div>'+
      '<div class="cell wide"><div class="k gl" data-g="彭祖百忌">彭祖百忌</div><div class="v">'+esc(pj)+'</div></div>'+
    '</div>'+
    '</section>'+
    '<section class="panel'+(actTab===1?' on':'')+'" data-p="1">'+
    '<div class="shen">'+
      '<div class="ji-good"><div class="k gl" data-g="吉神宜趋">吉神宜趋 · Auspicious</div><div class="v">'+glList(L.getDayJiShen())+'</div></div>'+
      '<div class="ji-bad"><div class="k gl" data-g="凶煞宜忌">凶煞宜忌 · Inauspicious</div><div class="v">'+glList(L.getDayXiongSha())+'</div></div>'+
    '</div>'+
    '</section>'+
    '<section class="panel'+(actTab===2?' on':'')+'" data-p="2">'+
    '<div class="sc">'+
      '<div class="sc-head"><b class="gl" data-g="时辰">时 辰 宜 忌</b><span>Two-hour periods · 吉/凶 by 值神</span></div>'+
      '<div class="sc-grid">'+scCells+'</div>'+
      '<div class="sc-detail">'+scDetail+'</div>'+
    '</div>'+

    '<div class="foot">'+
      '<span>上一节气 <b>'+esc(L.getPrevJieQi().getName())+'</b> '+L.getPrevJieQi().getSolar().toYmd()+'</span>'+
      '<span>下一节气 <b>'+esc(L.getNextJieQi().getName())+'</b> '+L.getNextJieQi().getSolar().toYmd()+'</span>'+
    '</div>'+
    '</section>';

    var page=document.getElementById("page");
    page.innerHTML=html;
    page.querySelectorAll(".sc-cell").forEach(function(c){
      c.addEventListener("click",function(){ pickedSel=+c.dataset.i; render(cur.y,cur.m,cur.d); });
    });
    function setTab(i){
      actTab=i;
      page.querySelectorAll(".tab").forEach(function(x){ x.classList.toggle("on", +x.dataset.t===i); });
      page.querySelectorAll(".dot").forEach(function(x){ x.classList.toggle("on", +x.dataset.t===i); });
      page.querySelectorAll(".panel").forEach(function(p){ p.classList.toggle("on", +p.dataset.p===i); });
    }
    page.querySelectorAll(".tab,.dot").forEach(function(b){
      b.addEventListener("click",function(){ setTab(+b.dataset.t); });
    });
  }

  // ---- state & controls ----
  var cur={y:0,m:0,d:0}, curShi=0;
  var pick=document.getElementById("datePick");

  function setTo(y,m,d){
    cur={y:y,m:m,d:d}; pickedSel=null;
    pick.value = y+"-"+String(m).padStart(2,"0")+"-"+String(d).padStart(2,"0");
    render(y,m,d);
  }
  function loadToday(){
    var tz=tzSel.value;
    var t=ymdInZone(tz); curShi=shiIndexInZone(tz);
    setTo(t[0],t[1],t[2]);
    var zname=tzSel.options[tzSel.selectedIndex].textContent;
    document.getElementById("tznote").textContent=
      "当前显示「"+zname+"」当地日期，时辰高亮按当地时间计算；切换城市可查看全球各地今日宜忌。提示：轻点带虚线的词可查看释义。";
  }
  function shift(n){
    var dt=new Date(cur.y,cur.m-1,cur.d); dt.setDate(dt.getDate()+n);
    setTo(dt.getFullYear(),dt.getMonth()+1,dt.getDate());
  }

  // ---- 术语释义弹层 (轻点) ----
  var tip=document.getElementById("tip"), tipMask=document.getElementById("tipMask");
  function showTip(term){
    if(!term) return;
    var key=(""+term).replace(/馀/g,"余").trim();
    var has=GLOSS[term]||GLOSS[key];
    var txt=has||"传统择吉用语，多与祭祀、农事、营建、婚丧等事项的宜忌相关，暂无简释。";
    document.getElementById("tipT").textContent=term;
    document.getElementById("tipB").textContent=txt;
    document.getElementById("tipF").textContent=has?"黄历术语仅供参考，非现代科学结论。":"";
    tip.hidden=false; tipMask.hidden=false;
  }
  function hideTip(){ tip.hidden=true; tipMask.hidden=true; }
  // event delegation: survives re-renders
  document.addEventListener("click",function(e){
    var g=e.target.closest&&e.target.closest(".gl");
    if(g){ e.stopPropagation(); showTip(g.dataset.g||g.textContent.trim()); }
  });
  document.getElementById("tipX").onclick=hideTip;
  tipMask.onclick=hideTip;
  document.addEventListener("keydown",function(e){ if(e.key==="Escape")hideTip(); });

  document.getElementById("prev").onclick=function(){shift(-1);};
  document.getElementById("next").onclick=function(){shift(1);};
  document.getElementById("todayBtn").onclick=loadToday;
  tzSel.onchange=loadToday;
  pick.onchange=function(){
    var p=pick.value.split("-"); if(p.length===3) setTo(+p[0],+p[1],+p[2]);
  };
  document.addEventListener("keydown",function(e){
    if(e.target.tagName==="INPUT"||e.target.tagName==="SELECT")return;
    if(e.key==="ArrowLeft")shift(-1); if(e.key==="ArrowRight")shift(1);
  });

  loadToday();
})();
