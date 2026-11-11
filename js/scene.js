import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const canvas = document.getElementById('gl');
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = x => 1 - Math.pow(1 - x, 4);

let renderer;
try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
} catch (e) {
    root.classList.add('no-gl');
    throw e;
}
root.classList.add("gl-on");
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(38, 1, .1, 100);
cam.position.set(0, 0, 12);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture;

const bgMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 }, r: { value: 1 }, m: { value: new THREE.Vector2() } },
    depthWrite: false,
    vertexShader: `varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec2 v;uniform float t,r;uniform vec2 m;
    float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
    float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p=p*2.+7.;a*=.5;}return s;}
    void main(){vec2 p=(v-.5)*vec2(r,1.)*2.2+m*.18;float k=t*.06;
        vec2 q=vec2(fbm(p+k),fbm(p+vec2(5.2,1.3)-k));float f=fbm(p+2.2*q+k*2.);
        vec3 c=mix(vec3(.027,.04,.12),vec3(.118,.137,.31),smoothstep(.2,.7,f));
        c=mix(c,vec3(.48,.17,.63),smoothstep(.45,.85,q.x)*.8);
        c+=vec3(.9,0.,.55)*smoothstep(.55,1.,q.y*f*1.9)*.6;
        c*=.7+.3*smoothstep(1.3,.2,length(v-.5)*2.);
        gl_FragColor=vec4(c+h(v*r*999.+t)*.02,1.);}`
});
const bg = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMat);
bg.position.z = -9;
scene.add(bg);

const glass = (col, att) => new THREE.MeshPhysicalMaterial({ color: col, transmission: 1, thickness: 1.4, roughness: .06, ior: 1.5, iridescence: 1, iridescenceIOR: 1.3, clearcoat: 1, attenuationColor: new THREE.Color(att), attenuationDistance: 1.6, envMapIntensity: 1.4 });
const parts = [
    { p: [-2.3, -1, 0], s: [.75, .75, .75], c: 0xffffff, a: '#7A2CA0' },
    { p: [-1.4, -.2, .2], s: [.75, .75, .75], c: 0xdcd0ff, a: '#1E234F' },
    { p: [-2.3, .7, -.2], s: [.6, .6, .6], c: 0xffffff, a: '#C9B8F4' },
    { p: [-1.4, 1.5, .1], s: [.7, .7, .7], c: 0xf0d6ff, a: '#7A2CA0' },
    { p: [-.7, -1.4, 0], s: [.55, .55, .55], c: 0xffffff, a: '#E6008D' },
    { p: [.9, 0, 0], s: [.95, 3.4, .95], c: 0xffd0ee, a: '#E6008D' },
    { p: [1.9, 1.55, 0], s: [1.9, .5, .5], c: 0xffffff, a: '#C9B8F4', rz: -.6 }
];

const emblem = new THREE.Group();
const rnd = (a) => (Math.random() - .5) * a;

parts.forEach((o, i) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(...o.s, 6, .12), glass(o.c, o.a));
    m.userData = { home: new THREE.Vector3(...o.p), start: new THREE.Vector3(rnd(16), rnd(12), -4 + rnd(8)), rs: new THREE.Euler(rnd(8), rnd(8), rnd(8)), rz: o.rz || 0, d: i * .14, ph: Math.random() * 6.3 };
    m.position.copy(m.userData.start);
    emblem.add(m);
});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(.28, 48, 48), new THREE.MeshStandardMaterial({ color: 0xE6008D, emissive: 0xE6008D, emissiveIntensity: 1.6, roughness: .3 }));
const ringA = new THREE.Mesh(new THREE.TorusGeometry(3.6, .02, 16, 220), new THREE.MeshStandardMaterial({ color: 0xC9B8F4, metalness: 1, roughness: .2 }));
const ringB = ringA.clone();
ringB.scale.setScalar(1.25);
emblem.add(sphere, ringA, ringB);
scene.add(emblem);

const N = 500;
const pp = new Float32Array(N * 3).map(() => rnd(26));
const pts = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pp, 3)), new THREE.PointsMaterial({ size: .035, color: 0xC9B8F4, transparent: true, opacity: .6, blending: THREE.AdditiveBlending, depthWrite: false }));
scene.add(pts);

const l1 = new THREE.PointLight(0xE6008D, 160, 30);
const l2 = new THREE.PointLight(0x7A2CA0, 160, 30);
scene.add(l1, l2);

const mouse = new THREE.Vector2();
const sm = new THREE.Vector2();
let sp = 0, aspect = 1;

addEventListener('pointermove', e => mouse.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight * 2 - 1)), { passive: true });

function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    aspect = w / h;
    cam.aspect = aspect;
    cam.updateProjectionMatrix();
    const H = 2 * Math.tan(cam.fov * Math.PI / 360) * 21;
    bg.scale.set(H * aspect, H, 1);
    bgMat.uniforms.r.value = aspect;
}
addEventListener('resize', resize);
resize();

const keys = [[.24, 0, 1], [-.24, 0, 1], [0, 0, 1.35]];
const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
    const vis = scrollY < innerHeight * 1.1;
    canvas.style.visibility = vis ? 'visible' : 'hidden';
    if (!vis) return;
    
    const dt = Math.min(clock.getDelta(), .05);
    const T = clock.elapsedTime * (reduce ? .15 : 1);
    sm.lerp(mouse, reduce ? 0 : .05);
    sp = lerp(sp, clamp(scrollY / (innerHeight * .9)), .08);
    
    const W = 2 * Math.tan(cam.fov * Math.PI / 360) * 12 * aspect;
    const mobile = aspect < .8;
    const x = mobile ? 0 : W * .22;
    const y = mobile ? 2.4 : lerp(0, 1.2, sp);
    const s = (mobile ? .6 : 1) * lerp(1, 1.5, sp);
    const ex = ease(sp) * 1.6;
    
    emblem.position.x = lerp(emblem.position.x, x, .1);
    emblem.position.y = lerp(emblem.position.y, y, .1);
    emblem.scale.setScalar(lerp(emblem.scale.x, s * 1.1, .1));
    emblem.rotation.y = sm.x * .5 + Math.sin(T * .3) * .15 + sp * .9;
    emblem.rotation.x = -sm.y * .3;
    
    emblem.children.forEach(m => {
        const u = m.userData;
        if (!u.home) return;
        const a = ease(clamp((T - .4 - u.d) / 2.4));
        m.position.lerpVectors(u.start, u.home, a).addScaledVector(u.home, ex * .9);
        m.position.y += Math.sin(T * .9 + u.ph) * .12 * a;
        m.rotation.set(u.rs.x * (1 - a) + T * .1 * ex, u.rs.y * (1 - a) + T * .12 * ex, u.rs.z * (1 - a) + u.rz);
    });
    
    sphere.position.set(Math.cos(T * .8) * 3.6, Math.sin(T * .8) * 1.2, Math.sin(T * .8) * 3.6);
    ringA.rotation.set(1.2, T * .2, T * .1);
    ringB.rotation.set(.4, -T * .15, T * .2);
    pts.rotation.y = T * .02 + sm.x * .1;
    pts.rotation.x = sm.y * .05;
    pts.position.y = sp * 1.5;
    l1.position.set(Math.cos(T * .5) * 6, Math.sin(T * .4) * 3, 5);
    l2.position.set(-Math.cos(T * .4) * 6, -2, Math.sin(T * .5) * 4 + 4);
    cam.position.x = sm.x * .4;
    cam.position.y = sm.y * .25;
    cam.lookAt(0, 0, 0);
    bgMat.uniforms.t.value = T;
    bgMat.uniforms.m.value.copy(sm);
    renderer.render(scene, cam);
});
