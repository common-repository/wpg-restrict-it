<?php
error_reporting(E_ALL);
/*
Plugin Name: WPG Restrict It
Plugin URI: http://www.wpguru.in/plugin/restrict-it/
Description: Restrict content and display it only 	when a user leaves comment
Author: Rakesh Raja
Version: 2.0
Author URI: http://wpguru.in
*/


function wpgrestrictit( $commentdata ) {
  if( $commentdata['comment_author'] != NULL) {
		$value = 'yes'.$commentdata['comment_post_ID'];
		$riauthor = $commentdata['comment_author'];
		setcookie("restrictit", $value, time()+60*60*24*365);
		setcookie("riauthor", $riauthor, time()+60*60*24*365);
  }

  return $commentdata;
}
add_action( 'preprocess_comment' , 'wpgrestrictit' ); 


//shortcode
function wpgrestrict( $atts, $content = null ){
	$postid = get_the_ID();
	$comments = get_comments('post_id='.$postid);

foreach($comments as $comment) :

		 if ( $comment->comment_author == $_COOKIE['riauthor']) {
				
				if ($_COOKIE['restrictit'] == 'yes'.$postid) { return $content;}
				}

endforeach;

	
}
add_shortcode( 'wpgrestrict', 'wpgrestrict' );



//add button to editor
add_action( 'init', 'wpgrestrict_buttons' );
function wpgrestrict_buttons() {
    add_filter( "mce_external_plugins", "wpgrestrict_add_buttons" );
    add_filter( 'mce_buttons', 'wpgrestrict_register_buttons' );
}
function wpgrestrict_add_buttons( $plugin_array ) {
	$plugin_array['wpgrestrict'] = plugins_url('/wpgrestrict.js',__file__);
    return $plugin_array;
}
function wpgrestrict_register_buttons( $buttons ) {
    array_push( $buttons, 'wpgrestrict' ); 
    return $buttons;
}

?>