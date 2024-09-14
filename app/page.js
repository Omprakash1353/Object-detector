import ObjectDetection from "@/components/ObjectDetection";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-8">
			<h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:p-6 text-center">
				{/* Object Detection using TensorFlow.js coco-ssd and Streamlit: */}
				Object Detection using NextJS
			</h1>
			<ObjectDetection />
		</main>
	);
}
