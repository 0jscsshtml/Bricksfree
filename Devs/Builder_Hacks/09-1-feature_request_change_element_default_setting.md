How to change any element control default settings ? There is a hook bricks/elements/{element_name}/controls can do it. Take for example you want to set Basic Text
element HTML tag 'p' as default. Then your code would be like below:

add_filter( 'bricks/elements/text-basic/controls', function( $controls ) {
  $controls['tag']['default'] = 'p';
  return $controls;
});

Next example, Image element, set caption default to none. 

add_filter( 'bricks/elements/image/controls', function( $controls ) {
  $controls['caption']['default'] = 'none';
  return $controls;
});


You can put this code in function.php file.
