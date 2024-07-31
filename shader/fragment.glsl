uniform sampler2D dayTexture;
uniform sampler2D nightTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vSunDir;

void main(void){
  vec3 dayColor=texture2D(dayTexture,vUv).rgb;
  vec3 nightColor=texture2D(nightTexture,vUv).rgb;
  
  float cosineAngleSunToNormal=dot(normalize(vNormal),normalize(vSunDir));
  
  cosineAngleSunToNormal=clamp(cosineAngleSunToNormal*5.,-1.,1.);
  
  float mixAmount=cosineAngleSunToNormal*.5+.5;
  
  vec3 color=mix(nightColor,dayColor,mixAmount);
  
  gl_FragColor=vec4(color,1.);
}