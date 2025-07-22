'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ShopModal from '@/components/ShopModal';
import { Shop } from '../components/types';

const SHOPS: Shop[] = [
	{
		id: '1',
		name: 'Alkaram Studio',
		size: '1000 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 35, y: 178 },
			{ x: 142, y: 178 },
			{ x: 142, y: 415 },
			{ x: 35, y: 415 },
		],
	},
	{
		id: '2',
		name: 'Mantra',
		size: '800 sq ft',
		status: 'vacant',
		rentStatus: 'n/a',
		polygon: [
			{ x: 142, y: 294 },
			{ x: 185, y: 294 },
			{ x: 185, y: 349 },
			{ x: 142, y: 349 },
		],
	},
	{
		id: '3',
		name: 'Limelight',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'unpaid',
		polygon: [
			{ x: 996, y: 282 },
			{ x: 1174, y: 282 },
			{ x: 1172, y: 355 },
			{ x: 996, y: 356 },
		],
	},
	{
		id: ' 4',
		name: 'Ree Bok',
		size: '700 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 278, y: 510 },
			{ x: 352, y: 510 },
			{ x: 352, y: 586 },
			{ x: 278, y: 586 },
		],
	},
	{
		id: '5',
		name: 'Beaute Collection',
		size: '700 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 226, y: 510 },
			{ x: 276, y: 510 },
			{ x: 276, y: 586 },
			{ x: 226, y: 586 },
		],
	},
	{
		id: '6',
		name: '1st Step',
		size: '760 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 354, y: 510 },
			{ x: 430, y: 510 },
			{ x: 430, y: 584 },
			{ x: 354, y: 584 },
		],
	},
	{
		id: '7',
		name: 'Nike',
		size: '850 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 429, y: 510 },
			{ x: 479, y: 510 },
			{ x: 479, y: 586 },
			{ x: 429, y: 586 },
		],
	},
	{
		id: '8',
		name: 'Puma',
		size: '500 sq ft',
		status: 'vacant',
		rentStatus: 'n/a',
		polygon: [
			{ x: 596, y: 510 },
			{ x: 634, y: 510 },
			{ x: 634, y: 586 },
			{ x: 596, y: 586 },
		],
	},
	{
		id: '9',
		name: 'Borjan',
		size: '1500 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 634, y: 510 },
			{ x: 708, y: 510 },
			{ x: 708, y: 586 },
			{ x: 634, y: 586 },
		],
	},
	{
		id: '10',
		name: 'U & Polo',
		size: '1500 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 710, y: 510 },
			{ x: 760, y: 510 },
			{ x: 760, y: 586 },
			{ x: 710, y: 586 },
		],
	},
	{
		id: '11',
		name: 'Stylo',
		size: '1500 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 760, y: 510 },
			{ x: 844, y: 510 },
			{ x: 844, y: 586 },
			{ x: 760, y: 586 },
		],
	},
	{
		id: '12',
		name: 'Insignia shoes',
		size: '1500 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 846, y: 510 },
			{ x: 927, y: 510 },
			{ x: 927, y: 586 },
			{ x: 846, y: 586 },
		],
	},
	{
		id: '13',
		name: 'Revolution',
		size: '1500 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 926, y: 510 },
			{ x: 1000, y: 510 },
			{ x: 1000, y: 586 },
			{ x: 926, y: 586 },
		],
	},
	{
		id: '14',
		name: 'Hush Puppies',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'unpaid',
		polygon: [
			{ x: 438, y: 410 },
			{ x: 500, y: 410 },
			{ x: 500, y: 470 },
			{ x: 438, y: 470 },
		],
	},
	{
		id: '15',
		name: 'Edenrode',
		size: '900 sq ft',
		status: 'vacant',
		rentStatus: 'n/a',
		polygon: [
			{ x: 436, y: 356 },
			{ x: 502, y: 356 },
			{ x: 502, y: 410 },
			{ x: 436, y: 410 },
		],
	},
	{
		id: '16',
		name: 'Kids Master',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'unpaid',
		polygon: [
			{ x: 436, y: 292 },
			{ x: 502, y: 292 },
			{ x: 502, y: 356 },
			{ x: 436, y: 356 },
		],
	},
	{
		id: '17',
		name: 'Traditions',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 500, y: 292 },
			{ x: 556, y: 292 },
			{ x: 556, y: 356 },
			{ x: 500, y: 356 },
		],
	},
	{
		id: '18',
		name: 'Syra',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'n/a',
		polygon: [
			{ x: 556, y: 292 },
			{ x: 590, y: 292 },
			{ x: 590, y: 356 },
			{ x: 556, y: 356 },
		],
	},
	{
		id: '19',
		name: 'Cotton & SIK',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 590, y: 292 },
			{ x: 630, y: 292 },
			{ x: 630, y: 356 },
			{ x: 590, y: 356 },
		],
	},
	{
		id: '20',
		name: 'EGO',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 562, y: 410 },
			{ x: 630, y: 410 },
			{ x: 630, y: 356 },
			{ x: 562, y: 356 },
		],
	},
	{
		id: '21',
		name: 'charles tyrwhitt',
		size: '950 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 600, y: 180 },
			{ x: 662, y: 180 },
			{ x: 662, y: 250 },
			{ x: 600, y: 250 },
		],
	},
	{
		id: '22',
		name: 'Hugo Boss',
		size: '950 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 664, y: 180 },
			{ x: 758, y: 180 },
			{ x: 758, y: 252 },
			{ x: 664, y: 252 },
		],
	},
	{
		id: '23',
		name: 'Entertainment',
		size: '950 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 758, y: 180 },
			{ x: 916, y: 180 },
			{ x: 916, y: 252 },
			{ x: 758, y: 252 },
		],
	},
	{
		id: '24',
		name: 'Minnie minors',
		size: '950 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 916, y: 180 },
			{ x: 1045, y: 180 },
			{ x: 1045, y: 252 },
			{ x: 916, y: 252 },
		],
	},
	{
		id: '25',
		name: 'Sapphire',
		size: '1100 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 1014, y: 180 },
			{ x: 1174, y: 180 },
			{ x: 1174, y: 282 },
			{ x: 1014, y: 282 },
		],
	},

	{
		id: '26',
		name: 'Meme',
		size: '800 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 35, y: 416 },
			{ x: 142, y: 416 },
			{ x: 140, y: 584 },
			{ x: 35, y: 584 },
		],
	},
	{
		id: '27',
		name: 'Hang Ten',
		size: '800 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 200, y: 385 },
			{ x: 267, y: 385 },
			{ x: 267, y: 470 },
			{ x: 200, y: 470 },
		],
	},
	{
		id: '28',
		name: "D' Man",
		size: '800 sq ft',
		status: 'vacant',
		rentStatus: 'n/a',
		polygon: [
			{ x: 142, y: 414 },
			{ x: 200, y: 414 },
			{ x: 200, y: 470 },
			{ x: 142, y: 470 },
		],
	},
	{
		id: '29',
		name: 'Mango',
		size: '850 sq ft',
		status: 'vacant',
		rentStatus: 'n/a',
		polygon: [
			{ x: 142, y: 178 },
			{ x: 342, y: 178 },
			{ x: 342, y: 252 },
			{ x: 142, y: 252 },
		],
	},
	{
		id: '30',
		name: 'Women secret',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 344, y: 180 },
			{ x: 404, y: 180 },
			{ x: 404, y: 250 },
			{ x: 344, y: 250 },
		],
	},
	{
		id: '31',
		name: 'Adidas',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 404, y: 180 },
			{ x: 526, y: 180 },
			{ x: 526, y: 250 },
			{ x: 404, y: 250 },
		],
	},
	{
		id: '32',
		name: 'Telenor Service Booth',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 526, y: 180 },
			{ x: 600, y: 180 },
			{ x: 600, y: 250 },
			{ x: 526, y: 250 },
		],
	},
	{
		id: '33',
		name: 'Bareeze',
		size: '900 sq ft',
		status: 'rented',
		rentStatus: 'paid',
		polygon: [
			{ x: 1000, y: 357 },
			{ x: 1171, y: 357 },
			{ x: 1171, y: 442 },
			{ x: 998, y: 442 },
		],
	},
	{
		id: '34',
		name: 'Nishat Linen',
		size: '500 sq ft',
		status: 'vacant',
		rentStatus: 'n/a',
		polygon: [
			{ x: 1000, y: 442 },
			{ x: 1172, y: 442 },
			{ x: 1172, y: 586 },
			{ x: 1000, y: 586 },
		],
	},
];

export default function Home() {
	const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	// const [scale, setScale] = useState(1);

	const handleShopClick = (shop: Shop) => {
		setSelectedShop(shop);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedShop(null);
	};

	useEffect(() => {
		const updateScale = () => {
			if (containerRef.current) {
				// You can remove these lines if not needed
				// const containerWidth = containerRef.current.offsetWidth;
				// const imageWidth = 1200;
				// const calculatedScale = containerWidth / imageWidth;
				// setScale(Math.min(calculatedScale, 1));
			}
		};

		window.addEventListener('resize', updateScale);
		updateScale();

		return () => window.removeEventListener('resize', updateScale);
	}, []);

	return (
		<main className="min-h-screen p-4 md:p-8 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">
					Click able Floor map
				</h1>

				{/* Stats Card */}
				<div className="flex flex-row flex-wrap gap-4 my-6">
					<div className="flex-1 min-w-[180px] bg-white rounded-lg shadow p-4 border border-gray-200">
						<h3 className="text-sm font-medium text-gray-500">Total Shops</h3>
						<p className="text-xl font-bold text-gray-800">{SHOPS.length}</p>
					</div>
					<div className="flex-1 min-w-[180px] bg-white rounded-lg shadow p-4 border border-gray-200">
						<h3 className="text-sm font-medium text-gray-500">
							Rented (Paid)
						</h3>
						<p className="text-xl font-bold text-green-500">
							{
								SHOPS.filter(
									(s) => s.status === 'rented' && s.rentStatus === 'paid'
								).length
							}
						</p>
					</div>
					<div className="flex-1 min-w-[180px] bg-white rounded-lg shadow p-4 border border-gray-200">
						<h3 className="text-sm font-medium text-gray-500">
							Rented (Unpaid)
						</h3>
						<p className="text-xl font-bold text-red-500">
							{
								SHOPS.filter(
									(s) => s.status === 'rented' && s.rentStatus === 'unpaid'
								).length
							}
						</p>
					</div>
					<div className="flex-1 min-w-[180px] bg-white rounded-lg shadow p-4 border border-gray-200">
						<h3 className="text-sm font-medium text-gray-500">Vacant</h3>
						<p className="text-xl font-bold text-yellow-600">
							{SHOPS.filter((s) => s.status === 'vacant').length}
						</p>
					</div>
				</div>

				<div
					ref={containerRef}
					className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
					style={{
						width: '100%',
						height: 'auto',
						aspectRatio: '16/9',
						overflow: 'hidden',
						position: 'relative',
					}}
				>
					<Image
						src="/1st-Floor.png"
						alt="Floor Plan"
						fill
						className="object-contain"
						priority
					/>

					<svg
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
						}}
						viewBox="0 0 1200 675"
					>
						{SHOPS.map((shop) => {
							if (!shop.polygon) return null;

							// Calculate center and bounds of the polygon
							const minX = Math.min(...shop.polygon.map((p) => p.x));
							const maxX = Math.max(...shop.polygon.map((p) => p.x));
							const minY = Math.min(...shop.polygon.map((p) => p.y));
							const maxY = Math.max(...shop.polygon.map((p) => p.y));
							const centerX = (minX + maxX) / 2;
							const centerY = (minY + maxY) / 2;

							return (
								<g key={shop.id}>
									<polygon
										points={shop.polygon
											?.map((p: { x: number; y: number }) => `${p.x},${p.y}`)
											.join(' ')}
										fill={
											shop.status === 'rented'
												? shop.rentStatus === 'paid'
													? 'rgba(34,197,94,0.5)' // green
													: 'rgba(185,28,28,0.6)' // darker red
												: 'rgba(234,179,8,0.6)' // darker yellow
										}
										stroke="black"
										strokeWidth="1"
										onClick={() => handleShopClick(shop)}
										style={{ cursor: 'pointer' }}
									/>
									<text
										x={centerX}
										y={centerY}
										textAnchor="middle"
										dominantBaseline="middle"
										fill="white"
										style={{
											pointerEvents: 'none',
											fontWeight: 'normal',
											fontSize: '12px',
											textShadow:
												'0 0 4px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.8)',
											textRendering: 'optimizeLegibility',
											filter: 'drop-shadow(0 0 2px #000)',
											WebkitTextStroke: '0.5px black',
											paintOrder: 'stroke fill',
										}}
									>
										{shop.name.split(' ').map((word, i, arr) => (
											<tspan
												key={i}
												x={centerX}
												dy={i > 0 ? '1.4em' : 0}
												style={{
													fontSize: arr.length > 1 ? '10px' : '12px',
													display: 'block',
													textAlign: 'center',
													width: maxX - minX + 'px',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
													whiteSpace: 'nowrap',
												}}
											>
												{word}
											</tspan>
										))}
									</text>
								</g>
							);
						})}
					</svg>
				</div>

				<div className="mt-6 flex flex-wrap gap-4 text-sm">
					<div className="flex items-center">
						<div className="w-4 h-4 bg-green-500 bg-opacity-50 mr-2 border border-green-500"></div>
						<span className="text-black">Rented (Paid)</span>
					</div>
					<div className="flex items-center">
						<div className="w-4 h-4 bg-red-800 bg-opacity-60 mr-2 border border-red-500"></div>
						<span className="text-black">Rented (Unpaid)</span>
					</div>
					<div className="flex items-center">
						<div className="w-4 h-4 bg-yellow-600 bg-opacity-60 mr-2 border border-yellow-500"></div>
						<span className="text-black">Vacant</span>
					</div>
				</div>
			</div>

			{isModalOpen && selectedShop && (
				<ShopModal shop={selectedShop} onClose={closeModal} />
			)}
		</main>
	);
}
