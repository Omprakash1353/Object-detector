"use client";

import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

import { useEffect, useRef, useState } from "react";
import { renderPredictions } from "@/utils/render-predictions";

let detectInterval;

export default function ObjectDetection() {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const [isLoading, setIsLoading] = useState(true);

	const runCoco = async () => {
		setIsLoading(true);
		const net = await cocoSSDLoad();
		setIsLoading(false);

		detectInterval = setInterval(() => {
			runObjectDetection(net);
		}, 10);
	};

	async function runObjectDetection(net) {
		if (
			canvasRef.current &&
			webcamRef.current !== null &&
			webcamRef.current.video?.readyState === 4
		) {
			canvasRef.current.width = webcamRef.current.video.videoWidth;
			canvasRef.current.height = webcamRef.current.video.videoHeight;

			const detectedObjects = await net.detect(
				webcamRef.current.video,
				undefined,
				0.6
			);

			// console.log(detectedObjects);

			const context = canvasRef.current.getContext("2d");
			renderPredictions(detectedObjects, context);
		}
	}

	const showVideo = () => {
		if (
			webcamRef.current !== null &&
			webcamRef.current.video?.readyState === 4
		) {
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;
		}
	};

	useEffect(() => {
		runCoco();
		showVideo();
	}, []);

	return (
		<div className="mt-8">
			{isLoading ? (
				<div className="gradient-text">Loading AI Model</div>
			) : (
				<div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
					{/* webcam */}
					<Webcam
						ref={webcamRef}
						className="rounded-md w-full lg:h-[720px]"
						muted
					/>
					{/* canvas */}
					<canvas
						ref={canvasRef}
						className="absolute top-0 left-0 z-[9999] w-full lg:h-[720px]"
					/>
				</div>
			)}
		</div>
	);
}
