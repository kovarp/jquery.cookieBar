/*!
 * Cookie Bar component (https://github.com/kovarp/jquery.cookieBar)
 * Version 1.1.1
 *
 * Copyright 2018 Pavel Kovář - Frontend developer [www.pavelkovar.cz]
 * @license: MIT (https://github.com/kovarp/jquery.cookieBar/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
	throw new Error('Cookie Bar component requires jQuery')
}

/**
 * ------------------------------------------------------------------------
 * Cookie Bar component
 * ------------------------------------------------------------------------
 */

(function ( $ ) {

	// Global variables
	var cookieBar, config;

	// Cookie Bar translations
	var translation = [];

	translation['en'] = {
		message:	'We use cookies to provide our services. By using this website, you agree to this.',
		acceptText:	'OK',
		infoText:	'More information'
	};

	translation['de'] = {
		message:	'Zur Bereitstellung von Diensten verwenden wir Cookies. Durch die Nutzung dieser Website stimmen Sie zu.',
		acceptText:	'OK',
		infoText:	'Mehr Informationen'
	};

	translation['cs'] = {
		message:	'K poskytování služeb využíváme soubory cookie. Používáním tohoto webu s&nbsp;tím souhlasíte.',
		acceptText:	'V pořádku',
		infoText:	'Více informací'
	};

	translation['sk'] = {
		message:	'Na poskytovanie služieb využívame súbory cookie. Používaním tohto webu s&nbsp;tým súhlasíte.',
		acceptText:	'V poriadku',
		infoText:	'Viac informácií'
	};

	var methods	= {
		init : function(options) {
			cookieBar = '#cookie-bar';

			var defaults = {
				infoLink: 	'https://www.google.com/policies/technologies/cookies/',
				infoTarget: '_blank',
				wrapper:	'body',
				expireDays:	365,
				style: 		'top',
				language:	$('html').attr('lang') || 'en'
			};

			config = $.extend(defaults, options);

			if(methods.getCookie('cookies-state') !== 'accepted') {
				methods.displayBar();
			}

			// Accept cookies
			$(document).on('click', cookieBar + ' .cookie-bar__btn', function(e) {
				e.preventDefault();

				methods.setCookie('cookies-state', 'accepted', config.expireDays);
				methods.hideBar();
			});
		},
		displayBar : function() {
			// Display Cookie Bar on page
			var acceptButton = '<button type="button" class="cookie-bar__btn">' + translation[config.language].acceptText + '</button>';
			var infoLink = '<a href="' + config.infoLink + '" target="' + config.infoTarget + '">' + translation[config.language].infoText + '</a>';
			var template = '<div id="cookie-bar" class="cookie-bar cookie-bar--' + config.style + '"><div class="cookie-bar__inner"><span class="cookie-bar__message">' + translation[config.language].message + '</span><span class="cookie-bar__buttons">' + acceptButton + infoLink + '</span></div></div>';

			$(config.wrapper).prepend(template);
		},
		hideBar : function() {
			// Hide Cookie Bar
			$(cookieBar).slideUp();
		},
		addTranslation : function(lang, translate) {
			translation[lang] = translate;
		},
		setCookie : function(cname, cvalue, exdays) {
			// Helpful method for set cookies
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires="+ d.toUTCString();

			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		},
		getCookie : function(cname) {
			// Helpful method for get cookies
			var name = cname + "=";
			var ca = document.cookie.split(';');

			for(var i = 0; i <ca.length; i++) {
				var c = ca[i];

				while (c.charAt(0) === ' ') {
					c = c.substring(1);
				}

				if (c.indexOf(name) === 0) {
					return c.substring(name.length, c.length);
				}
			}

			return '';
		}
	};

	// Create jQuery cookieBar function
	$.cookieBar = function (methodOrOptions) {
		if ( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  methodOrOptions + ' does not exist on Cookie Bar component' );
		}
	};
}( jQuery ));