import './style.css'
import * as THREE from 'three'
import { Mesh, MeshBasicMaterial, Vector3 } from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
//import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
// import matImage from './8.png'


/*
textures
*/


const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('./8.png')


//fonts
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
const fontLoader = new THREE.FontLoader()
fontLoader.load(
    './fonts/helvetiker_regular.typeface.json',
    (font) => {
        // console.log('font loaded')
        const textGeometry = new THREE.TextBufferGeometry(
            'creative',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        const textGeometry2 = new THREE.TextBufferGeometry(
            'developer',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        const textGeometry3 = new THREE.TextBufferGeometry(
            'designer',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        const textGeometry4 = new THREE.TextBufferGeometry(
            'digital artist',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        textGeometry.center()
        textGeometry2.center()
        textGeometry3.center()
        textGeometry4.center()
        textGeometry.translate(
            0, 0.7, 0
        )
        textGeometry3.translate(
            0, -0.7, 0
        )
        textGeometry4.translate(
            0, -1.4, 0
        )

        const text1 = new THREE.Mesh(textGeometry, textMaterial)
        const text2 = new THREE.Mesh(textGeometry2, textMaterial)
        const text3 = new THREE.Mesh(textGeometry3, textMaterial)
        const text4 = new THREE.Mesh(textGeometry4, textMaterial)
        scene.add(text1, text2, text3, text4)

        // console.time('donuts')
        const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
        const donutMaterial = new THREE.MeshNormalMaterial()
        for (let i = 0; i < 100; i++) {

            const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            donut.position.x = (Math.random() - 0.5) * 13
            donut.position.y = (Math.random() - 0.5) * 13
            donut.position.z = (Math.random() - 0.5) * 13

            donut.rotation.x = (Math.random() * Math.PI)
            donut.rotation.y = (Math.random() * Math.PI)

            const scale = Math.random()
            donut.scale.x = scale
            donut.scale.y = scale
            donut.scale.z = scale

            scene.add(donut)
        }
        // console.timeEnd('donuts');

        //cubes
        const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        const cubeMaterial = new THREE.MeshNormalMaterial()
        for (let i = 0; i < 50; i++) {

            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.position.x = (Math.random() - 0.5) * 12
            cube.position.y = (Math.random() - 0.5) * 12
            cube.position.z = (Math.random() - 0.5) * 12

            cube.rotation.y = (Math.random() * Math.PI)
            cube.rotation.x = (Math.random() * Math.PI)

            const scale = Math.random()
            cube.scale.x = scale
            cube.scale.y = scale
            cube.scale.z = scale

            scene.add(cube)
        }

    }
)




//to create the scene
const scene = new THREE.Scene()



/**
 * lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(ambientLight, pointLight)

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//handle resize
window.addEventListener('resize', () => {
    //console.log('resize')
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera aspect ratio
    camera.aspect = sizes.width / sizes.height

    //when changing properties like aspect, we need to call the camera.updateProjectionMatrix()
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)

    //set pixelRatio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

//handle fullscreen
window.addEventListener('dblclick', () => {
    // console.log('double clicked')
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        // console.log('go fullscreen');
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    }
    else {
        // console.log('leave fullscreen');
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }

})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)


//adjusting the camera
camera.position.z = 3

//camera.lookAt(mesh.position)

//add camera to the scene
scene.add(camera)

const canvas = document.querySelector('.webgl')

const controls = new OrbitControls(camera, canvas)

controls.enabled = true
controls.enableDamping = true


//renderer
//renders the scene on the canvas, <canvas> is an html element where you can draw

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

//update the size of the renderer
renderer.setSize(sizes.width, sizes.height)
//set pixelRatio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//we can also use clock
//clock
let clock = new THREE.Clock()

const tick = () => {

    //clock
    const elapsedTime = clock.getElapsedTime()

    //update controls
    controls.update()

    //renderer
    renderer.render(scene, camera)
    //to call on each frame
    window.requestAnimationFrame(tick)
}

tick()