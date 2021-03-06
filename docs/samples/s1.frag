
// Sample shader from: http://glslsandbox.com/e#21330.5

/* Here's a block
comment for you.
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
// b/w remix
// tomaes.32x.de 2014.11
void main( void ) {

    vec3 col = vec3(0.1,0.2,0.3);
    vec2 pos = ( gl_FragCoord.xy / resolution.xy );

    float sd = 0.19 - (pos.y*0.004 / pos.x*0.5) - atan( pos.x + pos.y, 40.0 );
    float so = 0.22 + pos.y*0.0003/pos.x*(0.15 + sin(time*0.04+pos.x*3.5));
     
    float t = mod(time*0.1, 2.0) + 440.0;
    float x = mod(pos.x + t, so);
    float y = mod(pos.y + t, so*2.0);
    float d1 = mod( distance( vec2(x,y), vec2(so*0.45,so*1.05) ) + t*0.5, 0.05) * 3.0 + pos.x * 0.5;
    float d2 = mod( distance( vec2(x,y), vec2(so*0.55,so*0.95) ) + t*0.5, 0.015) * 3.0;
    
    if ((x-0.03 < sd) && (y-0.03 < sd*2.0))
    if ((x < sd) && (y < sd*2.0))
        col = vec3(0.2, 0.6, mix(d1, d2, 0.8) );
    else
        col = vec3(0.72, 0.25, pos.y * 0.06 + 0.3);
    

    float l = length(mod(t* 0.1 + col * distance(pos,vec2(pos.y,0.0)) ,0.02)*27.5); 
        
    if ((pos.y>0.1) && (pos.y < 0.9))
        gl_FragColor = vec4( l,l,l, 1.0 );
    else
        gl_FragColor = vec4( 0.9,0.9,0.9, 1.0);
}

