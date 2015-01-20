;(function(window) {
    'use strict';

    var Fishingtree = {},
        $ = window.jQuery || window.$ || null,
        _this = Fishingtree;

    /**
     * @namespace       Fishingtree
     * @author          Fishingtree Dev ( hyunkwan roh )
     * @type            {{}|*}
     */
    window.Fishingtree = window.Fishingtree || Fishingtree;

    /**
     * @description
     *  Fishingtree.js Version 정보
     * @global
     * @type        {String}
     */
    Fishingtree.version = '0.0.1';

    /**
     * @description
     * Utils 공용으로 쓰일 Javascript 정의
     * @global
     * @class       Fishingtree.Utils
     * @return      {Function}
     * @constructor
     */
    Fishingtree.Utils = function() {
        return this.Utils;
    };

    /**
     * @global
     * @lends       Fishingtree.Utils.prototype
     */
    Fishingtree.Utils.prototype = {
        /**
         * @param       {Object|Array}     destination
         * @param       {Object|Array}     source
         * @return      {Object|Array}
         */
        extend : function (destination, source) {
            for (var property in source) {
                if( source.hasOwnProperty( property ) ) {
                    destination[property] = source[property];
                }
            }
            return destination;
        },
        /**
         * @param       {String}      str
         * @param       {Function}    callback
         * @return      {String}
         */
        strLoop : function( str, callback ) {
            var strArr = str.split('');
            strArr.forEach(function( val, index ) {
                if( callback )  callback( val, index );
            });
        }
    };

    /**
     * @description
     *  Value의 Format 변환 관련 Javascript 정의
     * @global
     * @class       Fishingtree.FormatUtils
     * @return      {Function}
     * @constructor
     */
    Fishingtree.FormatUtils = function() {
        return this.FormatUtils;
    };

    /**
     * @global
     * @lends       Fishingtree.FormatUtils.prototype
     */
    Fishingtree.FormatUtils.prototype = {
        /**
         * @description
         *  값에 comma를 찍어서 String으로 반환
         * @param   {Number|String} num         변환할 값
         * @param   {Number}        splitNum    콤마 단위
         * @return  {String}
         * @example
         * <code>
             // 기본 사용
             var exComma1 = Fishingtree.formatUtils.comma( 123456 );
             console.log( exComma1 );    // 123,456

             // comma 단위 설정
             var exComma2 = Fishingtree.formatUtils.comma( 123456, 4 );
             console.log( exComma2 );     // 12,3456

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.FormatUtils();
             var exComma3 = newClass.comma( 123456 );
             console.log( exComma3 );    // 123,456
         * </code>
         */
        comma : function( num, splitNum ) {
            splitNum 	= splitNum || 3;
            var arr 	= ('' + num).split(''),
                tlen 	= arr.length,
                clen 	= Math.ceil(tlen / splitNum);
            for( var i = 1; i < clen; i++ ) {
                arr.splice( tlen - i * splitNum, 0, ',' );
            }
            return arr.join('');
        },
        /**
         * @description
         *  값을 '원' 단위로 변환하여 반환
         * @param   {Number|String}     num     변환할 값
         * @param   {Boolean}           flag    '￦' 표시 여부
         * @default {@param flag}      false
         * @return  {String}
         * @example
         * <code>
             // 기본 사용
             var exCurrencyFormat1 = Fishingtree.formatUtils.currencyFormat( 123456 );
             console.log( exCurrencyFormat1 );   // 123,456

             // '￦' 표시
             var exCurrencyFormat2 = Fishingtree.formatUtils.currencyFormat( 123456, true );
             console.log( exCurrencyFormat2 );   // ￦123,456

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.FormatUtils();
             var exCurrencyFormat3 = newClass.currencyFormat( 123456 );
             console.log( exCurrencyFormat3 );   // 123,456
         * </code>
         */
        currencyFormat : function( num, flag ) {
            flag = flag || false;
            return flag ? '￦' + this.comma( num, 3 ) : this.comma( num, 3 );
        },
        /**
         * @description
         *  값을 시간형태로 변환하여 반환
         * @param   {Number}    time    변환할 값
         * @return  {Object}    {{hour: String, minute: String, second: String, hms: String}}
         * @example
         * <code>
             // 기본 사용
             var exTimeToString1 = Fishingtree.formatUtils.timeToString( 123456 );
             console.log( exTimeToString1.hms, exTimeToString1 );   // "34:17:36", {hour: "34", minute: "17", second: "36", hms: "34:17:36"}

             // 시간 분 초로 변환
             var exTimeToString2 = Fishingtree.formatUtils.timeToString( 123456 );
             exTimeToString2 = exTimeToString2.hms.split(':');
             exTimeToString2 = exTimeToString2[ 0 ] + '시간' + exTimeToString2[ 1 ] + '분' + exTimeToString2[ 2 ] + '초'
             console.log( exTimeToString2 );   // 34시간17분36초

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.FormatUtils();
             var exTimeToString3 = newClass.timeToString( 123456 );
             console.log( exTimeToString3.hms, exTimeToString3 );   // "34:17:36", {hour: "34", minute: "17", second: "36", hms: "34:17:36"}
         * </code>
         */
        timeToString : function( time ) {
            var cs = parseInt( time ),
                cm = Math.floor( cs/60 ),
                ch = Math.floor( cs/3600 ),
                ss, sm, sh;
            if( cs >= 60 )	ss = this.addZero( cs % 60 );
            else			ss = this.addZero( cs );
            if( cm >= 60 )	sm = this.addZero( cm % 60 );
            else			sm = this.addZero( cm );
            sh = this.addZero( ch );
            sh = this.currencyFormat( sh );
            return {
                        'hour'      : sh,
                        'minute'    : sm,
                        'second'    : ss,
                        'hms'       : sh + ':' + sm + ':' + ss
                    }
        },
        /**
         * @description
         *  10 미만의 값에 '0'을 더하여 반환 - 디지털화
         * @param       {Number}    num     변환할 값
         * @return      {String}
         * @example
         * <code>
             // 기본 사용
             var exAddZero1 = Fishingtree.formatUtils.addZero( 9 );
             console.log( exAddZero1, typeof exAddZero1 );   // 09, string

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.FormatUtils();
             var exAddZero2 = newClass.addZero( 9 );
             console.log( exAddZero2, typeof exAddZero2 );   // 09, string
         * </code>
         */
        addZero : function( num ) {
            return ( parseInt( num ) < 10 ) ? '0' + num : '' + num;
        }
    };

    /**
     * @description
     *  String 과 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.StringUtils
     * @return      {Function}
     * @constructor
     */
    Fishingtree.StringUtils = function() {
        return this.StringUtils;
    };

    /**
     * @global
     * @lends       Fishingtree.StringUtils.prototype
     */
    Fishingtree.StringUtils.prototype = {
        /**
         * @description
         *  String의 Byte 값 반환
         * @param       {String}    str     Byte를 체크할 String
         * @return      {Number}    Byte 값
         * @example
         * <code>
             // 기본 사용 - 영문
             var exGetBytes1 = Fishingtree.stringUtils.getBytes( 'sampleString' );
             console.log( exGetBytes1 );     // 12

             // 기본 사용 - 한글, 숫자, 특수문자
             var exGetBytes2 = Fishingtree.stringUtils.getBytes( '한글1@' );
             console.log( exGetBytes2 );     // 6

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.StringUtils();
             var exGetBytes3 = newClass.getBytes( '1@한글' );
             console.log( exGetBytes3 );     // 6
         * </code>
         */
        getBytes : function( str ) {
            var bytes = 0,
                c;
            str = '' + str;
            for( var i = 0; i < str.length; i++ ) {
                c = escape( str.charAt( i ) );

                if( c.length == 1 )					bytes++;
                else if( c.indexOf( '%u' ) !=-1 )	bytes += 2;
                else if( c.indexOf( '%' ) !=-1 )	bytes += c.length/3;
            }
            return bytes;
        },
        /**
         * @description
         *  String 를 지정한 Byte까지만 표시하고 '...' 말줄임을 설정하여 값을 반환
         * @param       {String}    str     변환할 String
         * @param       {Number}    bytes   표시할 Byte
         * @param       {String}    replaceStr  '...' 말줄임을 표시할 문자열
         * @return      {String}
         * @example
         * <code>
             // 기본 사용
             var exGetRestrictBytes1 = Fishingtree.stringUtils.getRestrictBytes( '문자열을 이렇게 넣고', 10 );
             console.log( exGetRestrictBytes1 );     // 문자열을 이...

             // 기본 사용 - 말줄임을 *** 로 변경
             var exGetRestrictBytes2 = Fishingtree.stringUtils.getRestrictBytes( '문자열을 이렇게 넣고', 10, '***' );
             console.log( exGetRestrictBytes2 );     // 문자열을 이***

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.StringUtils();
             var exGetRestrictBytes3 = newClass.getRestrictBytes( '문자열을 이렇게 넣고', 10 );
             console.log( exGetRestrictBytes3 );     // 문자열을 이...
         * </code>
         */
        getRestrictBytes : function( str, bytes, replaceStr ) {
            var leng 	= 0,
                rtn 	= '',
                c 		= '';
            str = '' + str;
            bytes = parseInt( bytes );
            for( var i = 0; i < str.length; i++ ) {
                c = str.substr( i, 1 );
                rtn += c;
                leng += this.getBytes( c );
                if( leng > bytes ){
                    rtn += replaceStr || '...';
                    break;
                }
            }
            return rtn;
        }
    };

    /**
     * @description
     *  Number 와 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.NumberUtils
     * @return      {Function}
     * @constructor
     */
    Fishingtree.NumberUtils = function() {
        return this.NumberUtils;
    };

    /**
     * @global
     * @lends       Fishingtree.NumberUtils.prototype
     */
    Fishingtree.NumberUtils.prototype = {
        /**
         * @description
         *  min, max 최대 최소 값 사이의 랜덤값 반환
         * @param       {Number}    min     최소값
         * @param       {Number}    max     최대값
         * @return      {Number}
         * @example
         * <code>
             // 기본 사용
             var exRandomRange1 = Fishingtree.numberUtils.randomRange( 0, 10 );
             console.log( exRandomRange1 );     // 0 ~ 10 의 랜덤값

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.NumberUtils();
             var exRandomRange2 = newClass.randomRange( -10, 100 );
             console.log( exRandomRange2 );     // -10 ~ 100 의 랜덤값
         * </code>
         */
        randomRange : function( min, max ) {
            return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        },
        /**
         * @description
         *  min, max 최대 최소 값 사의 랜덤값 중 leng 수량 만큼의 값을 반환
         * @param       {Number}    min     최소값
         * @param       {Number}    max     최대값
         * @param       {Number}    leng    최소 ~ 최대 사이의 랜덤값중의 구할 수량
         * @return      {Array}
         * @example
         * <code>
             // 기본 사용
             var exRandomRangeArr1 = Fishingtree.numberUtils.randomRangeArr( 0, 10, 5 );
             console.log( exRandomRangeArr1 );     // 0 ~ 10 의 랜덤값 중 5개 추출

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.NumberUtils();
             var exRandomRangeArr2 = newClass.randomRangeArr( -10, 100, 50 );
             console.log( exRandomRangeArr2 );     // -10 ~ 100 의 랜덤값 중 50개 추출
         * </code>
         */
        randomRangeArr : function( min, max, leng ) {
            if( leng > ( max - min ) ) throw new Error('randomRangeArr >> 구하고자 하는 수량이 ( 최대 - 최소 ) 값 보다 큽니다.');
            var temp = [],
                rtn = [],
                idx, i;
            for( i = min; i < max; i++ ) 	temp.push( i );
            for( i = 0; i < leng; i++ ) {
                idx = Math.floor( Math.random() * temp.length );
                rtn.push( temp[ idx ] );
                temp.splice( idx, 1 );
            }
            return rtn;
        }
    };

    /**
     * @description
     *  Array 와 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.NumberUtils
     * @return      {Function}
     * @constructor
     */
    Fishingtree.ArrayUtils = function() {
        return this.ArrayUtils;
    };

    /**
     * @global
     * @lends       Fishingtree.ArrayUtils.prototype
     */
    Fishingtree.ArrayUtils.prototype = {
        /**
         * @description
         *  Arrary를 Random 으로 섞어서 반환
         * @param       {Arrary}    arr     random으로 섞을 Arrary
         * @return      {Array}
         * @example
         * <code>
             // 기본 사용
             var exRandom1 = Fishingtree.arrayUtils.random( [ 0, 1, 2, 3, 4, 5 ] );
             console.log( exRandom1 );     // [ 0, 1, 2, 3, 4, 5 ] 을 랜덤으로 섞는다

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.ArrayUtils();
             var exRandom2 = newClass.random( [ 0, 1, 2, 3, 4, 5 ] );
             console.log( exRandom2 );     // [ 0, 1, 2, 3, 4, 5 ] 을 랜덤으로 섞는다
         * </code>
         */
        random : function( arr ) {
            var rtn = [],
                i = 0,
                temp = arr.slice(0),
                leng = temp.length,
                idx;
            for( i = 0; i < leng; i++ ) {
                idx = Math.floor( Math.random() * temp.length );
                rtn.push( temp[ idx ] );
                temp.splice( idx, 1 );
            }
            return rtn;
        },
        /**
         * @description
         *  두개의 Arrary 비교
         * @param       {Arrary}    a       비교할 대상1
         * @param       {Arrary}    b       비교할 대상2
         * @return      {Boolean}
         * @example
         * <code>
             // 기본 사용
             var exEqual1 = Fishingtree.arrayUtils.equal( [ 0, 1, 2, 3, 4, 5 ], [ 0, 1, 2, 3, 4, 5 ] );
             console.log( exEqual1 );     // true

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.ArrayUtils();
             var exEqual2 = newClass.equal( [ 0, 1, 2, 3, 4, 5], [ 0, 1, 2 ] );
             console.log( exEqual2 );     // false
         * </code>
         */
        equal : function( a, b ) {
            return JSON.stringify( a ) === JSON.stringify( b );
            /*
             if( a === b ) 					return true;
             if( a == null || b == null )	return false;
             if( a.length != b.length )		return false;
             for( var i = 0; i < a.length; i++ ) {
             if( a[ i ] !== b[ i ] )		return false;
             }
             return true;
             */
        }
    };

    /**
     * @description
     *  유효성 검사와 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.Validate
     * @return      {Function}
     * @constructor
     */
    Fishingtree.Validate = function() {
        return this.Validate;
    };

    /**
     * @global
     * @lends       Fishingtree.Validate.prototype
     */
    Fishingtree.Validate.prototype = {
        /**
         * @description
         *  String의 한글 여부 체크
         * @param       {String}    str         체크할 String
         * @param       {Number}    startIdx    체크할 String 중 체크할 문자열 시작위치
         * @param       {Number}    endIdx      체크할 String 중 체크할 문자열 길이
         * @default
         *  {@param startIdx }  0<br/>
         *  {@param endIdx }  str.length
         * @return      {Boolean}
         * @example
         * <code>
             // 기본 사용
             var exIsKor1 = Fishingtree.validate.isKor( 'eng한글123' );
             console.log( exIsKor1 );     // false

             // 기본 사용 - 체크할 문자열의 위치 설정, 'eng한글123' 중 '한글'
             var exIsKor2 = Fishingtree.validate.isKor( 'eng한글123', 3, 2 );
             console.log( exIsKor2 );     // true

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Validate();
             var exIsKor3 = newClass.isKor( 'eng한글123' );
             console.log( exIsKor3 );     // false
         * </code>
         */
        isKor : function( str, startIdx, endIdx ) {
            str 		= '' + str;
            startIdx 	= startIdx	|| 0;
            endIdx 		= endIdx || str.length;

            var chkStr = str.substr( startIdx, endIdx),
                rtn = true;

            _this.utils.strLoop( chkStr, function( val, index ) {
                if( !/[ㄱ-ㅎㅏ-ㅣ가-힣]/g.test( val ) ) {
                    rtn = false;
                    return false;
                }
            });

            return rtn;
        },
        /**
         * @description
         *  String의 영문 여부 체크
         * @param       {String}    str         체크할 String
         * @param       {Number}    startIdx    체크할 String 중 체크할 문자열 시작위치
         * @param       {Number}    endIdx      체크할 String 중 체크할 문자열 길이
         * @default
         *  {@param startIdx }  0<br/>
         *  {@param endIdx }  str.length
         * @return      {Boolean}
         * @example
         * <code>
             // 기본 사용
             var exIsEng1 = Fishingtree.validate.isEng( 'eng' );
             console.log( exIsEng1 );     // true

             // 기본 사용 - 체크할 문자열의 위치 설정, 'eng한글123' 중 '한글'
             var exIsEng2 = Fishingtree.validate.isEng( 'eng한글123', 3, 2 );
             console.log( exIsEng2 );     // false

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Validate();
             var exIsEng3 = newClass.isEng( 'eng' );
             console.log( exIsEng3 );     // true
         * </code>
         */
        isEng : function( str, startIdx, endIdx ) {
            str 		= '' + str;
            startIdx 	= startIdx	|| 0;
            endIdx 		= endIdx || str.length;

            var chkStr = str.substr( startIdx, endIdx),
                rtn = true;

            _this.utils.strLoop( chkStr, function( val, index ) {
                if( !/^[A-za-z]/g.test( val ) ) {
                    rtn = false;
                    return false;
                }
            });

            return rtn;
        },
        /**
         * @description
         *  String의 숫자 여부 체크
         * @param       {String}    str         체크할 String
         * @param       {Number}    startIdx    체크할 String 중 체크할 문자열 시작위치
         * @param       {Number}    endIdx      체크할 String 중 체크할 문자열 길이
         * @default
         *  {@param startIdx }  0<br/>
         *  {@param endIdx }  str.length
         * @return      {Boolean}
         * @example
         * <code>
             // 기본 사용
             var exIsNumber1 = Fishingtree.validate.isNumber( 'eng한글123' );
             console.log( exIsNumber1 );     // false

             // 기본 사용 - 체크할 문자열의 위치 설정, 'eng한글123' 중 123
             var exIsNumber2 = Fishingtree.validate.isNumber( 'eng한글123', 5, 3 );
             console.log( exIsNumber2 );     // true

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Validate();
             var exIsNumber3 = newClass.isNumber( 'eng한글123' );
             console.log( exIsNumber3 );     // false
         * </code>
         */
        isNumber : function( str, startIdx, endIdx ) {
            str 		= '' + str;
            startIdx 	= startIdx	|| 0;
            endIdx 		= endIdx || str.length;

            var chkStr = str.substr( startIdx, endIdx),
                rtn = true;

            _this.utils.strLoop( chkStr, function( val, index ) {
                if( !/^[0-9]*$/.test( val ) ) {
                    rtn = false;
                    return false;
                }
            });

            return rtn;
        },
        /**
         * @description
         *  String의 이메일 여부 체크
         * @param       {String}    email       체크할 email String
         * @return      {Boolean}
         * @example
         * <code>
             // 기본 사용
             var exIsEmail1 = Fishingtree.validate.isEmail( 'eng한글123' );
             console.log( exIsEmail1 );     // false

             // 기본 사용
             var exIsEmail2 = Fishingtree.validate.isEmail( 'hkroh@fishingtree.com' );
             console.log( exIsEmail2 );     // true

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Validate();
             var exIsEmail3 = newClass.isEmail( 'hkroh@fishingtree' );
             console.log( exIsEmail3 );     // false
         * </code>
         */
        isEmail : function( email ) {
            var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            return regExp.test( email );
        }
    };

    /**
     * @description
     *  window.location 과 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.Location
     * @return      {Function}
     * @constructor
     */
    Fishingtree.Location = function() {
        return this.Locations;
    };

    /**
     * @global
     * @lends       Fishingtree.Location.prototype
     */
    Fishingtree.Location.prototype = {
        /**
         * @description
         *  location.href 또는 href 값에서 queryString 추출 반환
         * @param       {String}    href    href값
         * @return      {Object}
         * @example
         * <code>
             // 기본 사용 - http://localhost:63342/Fishingtree/index.html?temp=1
             var exGetQueryStr1 = Fishingtree.location.getQueryStr();
             console.log( exGetQueryStr1 );     // {temp: "1"}

             // 직접 href 값을 넣는 경우
             var exGetQueryStr2 = Fishingtree.location.getQueryStr( 'http://www.fishingtree.com?a=1&b=2#top' );
             console.log( exGetQueryStr2 );     // {a: "1", b: "2#top"}

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Location();
             var exGetQueryStr3 = newClass.getQueryStr( 'index.html' );
             console.log( exGetQueryStr3 );     // {}
         * </code>
         */
        getQueryStr : function( href ) {
            href = href || window.location.href;
            var vars = {},
                parts = href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                        vars[key] = value;
                    });
            return vars;
        },
        /**
         * @description
         *  location.href 에서 페이지명만 반환
         * @param       {String}    href    href 값
         * @default
         *  {@param href} location.href
         * @return      {String}
         * @example
         * <code>
             // 기본 사용 - http://localhost:63342/Fishingtree/index.html
             var exGetPageLocation1 = Fishingtree.location.getPageLocation();
             console.log( exGetPageLocation1 );  // index.html

             // href 값을 넣어서 사용
             var exGetPageLocation2 = Fishingtree.location.getPageLocation( 'http://localhost:63342/Fishingtree/index.html?a=1&b=2#top' );
             console.log( exGetPageLocation2 );  // index.html

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Location();
             var exGetPageLocation3 = newClass.getPageLocation();
             console.log( exGetPageLocation3 );  // index.html
         * </code>
         */
        getPageLocation : function( href ) {
            var page;

            href = href || location.href;
            href = href.split('?')[ 0 ];
            href = href.split('#')[ 0 ];
            href = href.split('/');
            page = href[ href.length - 1 ] === '' ? href[ href.length - 2 ] : href[ href.length - 1 ];

            return page;
        },
        /**
         * @description
         *  location.href 에서 search, hash를 제외한 순수한 url 정보 반환
         * @param       {String}    href    href 값
         * @default
         *  {@param href} location.href
         * @return      {String}
         * @example
         * <code>
             // 기본 사용 - http://localhost:63342/Fishingtree/index.html
             var exGetFullPageLocation1 = Fishingtree.location.getFullPageLocation();
             console.log( exGetFullPageLocation1 );  // http://localhost:63342/Fishingtree/index.html

             // href 값을 넣어서 사용
             var exGetFullPageLocation2 = Fishingtree.location.getFullPageLocation( 'http://localhost:63342/Fishingtree/index.html?a=1&b=2#top' );
             console.log( exGetFullPageLocation2 );  // http://localhost:63342/Fishingtree/index.html

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Location();
             var exGetFullPageLocation3 = newClass.getFullPageLocation();
             console.log( exGetFullPageLocation3 );  // http://localhost:63342/Fishingtree/index.html
         * </code>
         */
        getFullPageLocation : function( href ) {
            href = href || location.href;
            href = href.split('?')[ 0 ];
            href = href.split('#')[ 0 ];
            return href;
        }
    };

    /**
     * @description
     *  window 와 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.Window
     * @return      {Function}
     * @constructor
     */
    Fishingtree.Window = function() {
        return this.Windows;
    };

    /**
     * @global
     * @lends       Fishingtree.Window.prototype
     */
    Fishingtree.Window.prototype = {
        /**
         *
         * @param       options
         * @param       {Object}              options                 -   윈도우 open 옵션
         * @param       {String}              options.url
         * @param       {String|English}      options.name
         * @param       {Number}              options.width
         * @param       {Number}              options.height
         * @param       {Number}              options.left
         * @param       {Number}              options.top
         * @param       {yes|no}              options.scrollbars
         * @param       {yes|no}              options.toolbar
         * @param       {yes|no}              options.location
         * @param       {yes|no}              options.directories
         * @param       {yes|no}              options.status
         * @param       {yes|no}              options.menubar
         * @param       {yes|no}              options.resizable
         * @default
         * <PRE>
         *  {
            url         : 'http://www.fishingtree.com',
            name        : 'Fishintree_window_open_' + new Date().getTime(),
            width       : 400,
            height      : 400,
            left        : null,
            top         : null,
            scrollbars  : 'no',
            toolbar     : 'no',
            location    : 'no',
            directories : 'no',
            status      : 'no',
            menubar     : 'no',
            resizable   : 'no'
        }</PRE>
         * @return      {Window}
         * @example
         * <code>
             // 기본 사용
             var exOpen1 = Fishingtree.window.open();
             console.log( exOpen1 );     // 팝업 차단시 > undefined, 팝업 허용시 > Window {top: Window, window: Window, location: Location, external: Object, chrome: Object…}

             // 옵션을 변경하여 사용
             // 이때 left, top은 1이하의 값을 인식 하지 않으므로 최소 1의 값으로 설정
             var exOpen2 = Fishingtree.window.open({
                url : 'http://www.google.com',
                left : 1,
                top : 1,
                width : 500,
                height : 100
            });
             console.log( exOpen2 );     // 팝업 차단시 > undefined, 팝업 허용시 > Window {top: Window, window: Window, location: Location, external: Object, chrome: Object…}

             // 기본 name값이 랜덤으로 변경하여 중첩되지 않으므로 단일 창만 사용해야 할 경우 name 값을 지정한다
             var exOpen3 = Fishingtree.window.open({
                url : 'http://www.google.com',
                name : 'onlyOne',
                left : 100,
                top : 100,
                width : 500,
                height : 100
            });
             var exOpen4 = Fishingtree.window.open({
                url : 'http://www.github.com',
                name : 'onlyOne',
                left : 100,
                top : 100,
                width : 500,
                height : 100
            });

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Window();
             var exOpen5 = newClass.open();
         * </code>
         */
        open : function( options ) {
            var defaults =   {
                url 		: 'http://www.fishingtree.com',
                name 		: 'Fishintree_window_open_' + new Date().getTime(),
                width 		: 400,
                height 		: 400,
                left 		: null,
                top 		: null,
                scrollbars	: 'no',
                toolbar 	: 'no',
                location 	: 'no',
                directories : 'no',
                status 		: 'no',
                menubar 	: 'no',
                resizable 	: 'no'
            }, opener, setting;

            options 		= _this.utils.extend( defaults, options );
            options.left 	= options.left || ( screen.width / 2 - options.width / 2 );
            options.top 	= options.top || ( screen.height / 2 - options.height / 2 );
            setting = '';

            for( var prop in options ) {
                if( prop != 'url' && prop != 'name' ) {
                    setting += ',' + prop + '=' + options[ prop ];
                }
            }
            setting = setting.substr( 1, setting.length );
            opener = window.open( options.url, options.name, setting );
            return opener;
        },
        isAllowPop : function() {
            var opener = this.open({
                left : screen.width,
                top : screen.height,
                width: 1,
                height: 1
            }), flag;

            flag = ( opener ) ? true : false;
            if( flag ) opener.close();

            return flag;
        }
    };

    /**
     * @description
     *  Cookie 와 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.Cookie
     * @return      {Function}
     * @constructor
     */
    Fishingtree.Cookie = function() {
        return this.Cookie;
    };

    /**
     * @global
     * @lends       Fishingtree.Cookie.prototype
     */
    Fishingtree.Cookie.prototype = {
        /**
         * @description
         *  Cookie 를 설정
         * @param       {String}    cname       설정할 Cookie Name
         * @param       {*}         cvalue      설정한 Cookie 값
         * @param       {Number}    exdays      설정한 Cookie 기간 - 일 단위
         * @example
         * <code>
             // 기본 사용 - test 쿠키명에 done 값을 현재 시간 기준으로 1일간 설정
             var exCookieSet1 = Fishingtree.cookie.setCookie( 'test', 'done', 1 );

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Cookie();
             var exCookieSet2 = newClass.setCookie( 'test2', 'done', 1 );
         * </code>
         */
        setCookie : function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        /**
         * @description
         *  설정된 Cookie 값 반환
         * @param       {String}    cname       찾고자하는 Cookie Name
         * @return      {String}
         * @example
         * <code>
             // 기본 사용 - test 쿠키명 확인
             var exCookieGet1 = Fishingtree.cookie.getCookie( 'test' );
             console.log( exCookieGet1 );

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Cookie();
             var exCookieGet2 = newClass.getCookie( 'test' );
             console.log( exCookieGet2 );
         * </code>
         */
        getCookie : function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
            }
            return "";
        }
    };

    /**
     * @description
     *  console 과 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.Console
     * @return      {Function}
     * @constructor
     */
    Fishingtree.Console = function() {
        /**
         * @description
         *  console 사용 유무
         * @type        {Boolean}
         * @default     true
         * @private
         */
        var _isDebug = true;

        /**
         * @description
         *  url의 debug 모드용 search 값 설정
         * @type        {string}
         * @default     'debug'
         * @private
         */
        var _debugParam = 'debug';

        /**
         * @description
         *  debug 유무 flag 설정
         * @param       {Boolean}   flag    console 사용 유무 설정
         * @see         _isDebug
         * @default
         *  {@param flag}   true
         */
        this.debug = function( flag ) {
            _isDebug = flag;
        };

        /**
         * @description
         *  url의 search 값을 이용한 디버깅 설정
         * @param       {String}   param    체크할 url 의 search 값
         * @see         _debugParam
         * @default
         *  {@param param}  'debug'
         */
        this.debugParam = function( param ) {
            _debugParam = param;
        };

        /**
         * @description
         *  debugParam, debugFlag 의 설정에 따른 디버깅 유무를 판단
         * @return      {boolean}
         */
        this.isDebugMode = function() {
            return _this.location.getParams()[ _debugParam ] || _isDebug;
        };

        return this.Console;
    };

    /**
     * @global
     * @lends       Fishingtree.Console.prototype
     */
    Fishingtree.Console.prototype = {
        /**
         * @description
         *  window.console 유무와 debug & debugParam 에 따른 console.log 출력
         * @example
         * <code>
             // 기본 사용
             var exConsole1 = Fishingtree.console;
             exConsole1.log( 'test', 5+3, 5*5, 5/2 );    // ["test", 8, 25, 2.5]

             // console 사용 중지
             var exConsole2 = Fishingtree.console;
             exConsole2.debug( false );
             exConsole2.log( 'test', 5+3, 5*5, 5/2 );    //

             // url serach 값 이용 - http://localhost:63342/Fishingtree/index.html?debug=1
             // console 의 사용을 중지하고도 log를 확인 할 수 있음 - 실서버 반영시 활용 가능
             var exConsole3 = Fishingtree.console;
             exConsole3.debug( false );
             exConsole3.debugParam( 'debug' );
             exConsole3.log( 'test', 5+3, 5*5, 5/2 );    // ["test", 8, 25, 2.5]

             // url serach 값 이용 - http://localhost:63342/Fishingtree/index.html?viewConsole=1
             var exConsole4 = Fishingtree.console;
             exConsole4.debugParam( 'viewConsole' );
             exConsole4.log( 'test', 5+3, 5*5, 5/2 );    // ["test", 8, 25, 2.5]

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Console();
             newClass.log( 'test', 5+3, 5*5, 5/2 );        // ["test", 8, 25, 2.5]
         * </code>
         */
        log : function() {
            if( window.console && this.isDebugMode() ) {
                console.log( Array.prototype.slice.call(arguments) );
            }
        }
    };

    /**
     * @description
     *  Date 와 관련한 Javascript 정의
     * @global
     * @class       Fishingtree.Date
     * @return      {Function}
     * @constructor
     */
    Fishingtree.Date = function() {
        return this.Date;
    };

    /**
     * @global
     * @lends       Fishingtree.Date.prototype
     */
    Fishingtree.Date.prototype = {
        /**
         * @description
         *  ajax 로 서버의 시간정보를 반환
         * @return {Date}
         * @example
         * <code>
             // 기본 사용
             var exDate1 = Fishingtree.date;
             console.log( exDate1.getServerTime() ); // Tue Jan 20 2015 17:23:14 GMT+0900 (대한민국 표준시)

             // 시간만 추출 - hh-mm 포맷
             var formatUtils = Fishingtree.formatUtils;
             var exDate2 = Fishingtree.date;
             var exDate2_serveTime = exDate2.getServerTime();
             console.log( formatUtils.addZero( exDate2_serveTime.getHours() ), formatUtils.addZero( exDate2_serveTime.getMinutes() ) ); // 17 23

             // 새로운 이름으로 Class를 선언하여 사용시
             var newClass = new Fishingtree.Date();
             console.log( newClass.getServerTime() ); // Tue Jan 20 2015 17:23:14 GMT+0900 (대한민국 표준시)
         * </code>
         */
        getServerTime : function() {
            var href = window.location.href.toString(),
                xmlHttp;

            if( window.XMLHttpRequest ) {
                xmlHttp = new XMLHttpRequest();
                xmlHttp.open( 'HEAD', href, false );
                xmlHttp.setRequestHeader( 'Content-Type', 'text/html' );
                xmlHttp.send( '' );
                return new Date( xmlHttp.getResponseHeader( 'Date' ) );
            } else if( window.ActiveXObject ) {
                xmlHttp = new ActiveXObject( 'Msxml2.XMLHTTP' );
                xmlHttp.open( 'HEAD', href, false );
                xmlHttp.setRequestHeader( 'Content-Type', 'text/html' );
                xmlHttp.send( '' );
                return new Date( xmlHttp.getResponseHeader( 'Date' ) );
            }
        }
    };

    /**
     * @global
     * @see         Utils
     * @type        {Fishingtree.Utils}
     */
    Fishingtree.utils = new Fishingtree.Utils();
    /**
     * @global
     * @see         FormatUtils
     * @type        {Fishingtree.FormatUtils}
     */
    Fishingtree.formatUtils = new Fishingtree.FormatUtils();
    /**
     * @global
     * @see         StringUtils
     * @type        {Fishingtree.StringUtils}
     */
    Fishingtree.stringUtils = new Fishingtree.StringUtils();
    /**
     * @global
     * @see         NumberUtils
     * @type        {Fishingtree.NumberUtils}
     */
    Fishingtree.numberUtils = new Fishingtree.NumberUtils();
    /**
     * @global
     * @see         ArrayUtils
     * @type        {Fishingtree.ArrayUtils}
     */
    Fishingtree.arrayUtils = new Fishingtree.ArrayUtils();
    /**
     * @global
     * @see         Validate
     * @type        {Fishingtree.Validate}
     */
    Fishingtree.validate = new Fishingtree.Validate();
    /**
     * @global
     * @see         Location
     * @type        {Fishingtree.Location}
     */
    Fishingtree.location = new Fishingtree.Location();
    /**
     * @global
     * @see         Window
     * @type        {Fishingtree.Window}
     */
    Fishingtree.window = new Fishingtree.Window();
    /**
     * @global
     * @see         Cookie
     * @type        {Fishingtree.Cookie}
     */
    Fishingtree.cookie = new Fishingtree.Cookie();
    /**
     * @global
     * @see         Console
     * @type        {Fishingtree.Console}
     */
    Fishingtree.console = new Fishingtree.Console();
    /**
     * @global
     * @see         Date
     * @type        {Fishingtree.Date}
     */
    Fishingtree.date = new Fishingtree.Date();
}(window));