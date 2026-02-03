'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ShopModal from '@/components/ShopModal';
import { Shop, Floor } from '../components/types';
import { Building2, Users, DollarSign, AlertCircle, MapPin, Search, Filter, X, Layers } from 'lucide-react';
import shopsData from '../data/shops.json';
import floorsData from '../data/floors.json';

const SHOPS: Shop[] = shopsData as Shop[];
const FLOORS: Floor[] = floorsData as Floor[];

export default function Home() {
	const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [selectedStatus, setSelectedStatus] = useState<string>('all');
	const [highlightedShopId, setHighlightedShopId] = useState<string | null>(null);
	const [selectedFloor, setSelectedFloor] = useState<string>(FLOORS[0].id);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const shopsPerPage = 10;

	// Filter shops based on search, filters, and floor
	const filteredShops = SHOPS.filter(shop => {
		const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
		const matchesStatus = selectedStatus === 'all' || shop.status === selectedStatus;
		const matchesFloor = !shop.floorId || shop.floorId === selectedFloor;
		return matchesSearch && matchesCategory && matchesStatus && matchesFloor;
	});

	// Pagination calculations
	const totalPages = Math.ceil(filteredShops.length / shopsPerPage);
	const indexOfLastShop = currentPage * shopsPerPage;
	const indexOfFirstShop = indexOfLastShop - shopsPerPage;
	const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);

	// Reset to page 1 when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedCategory, selectedStatus, selectedFloor]);

	const currentFloor = FLOORS.find(floor => floor.id === selectedFloor) || FLOORS[0];

	const handleShopClick = (shop: Shop) => {
		setSelectedShop(shop);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedShop(null);
	};

	const handleShopHover = (shopId: string | null) => {
		setHighlightedShopId(shopId);
	};

	const clearFilters = () => {
		setSearchTerm('');
		setSelectedCategory('all');
		setSelectedStatus('all');
	};

	const getCategoryColor = (category: string) => {
		const colors = {
			clothing: 'bg-purple-100 text-purple-800',
			footwear: 'bg-blue-100 text-blue-800',
			electronics: 'bg-gray-100 text-gray-800',
			food: 'bg-orange-100 text-orange-800',
			services: 'bg-green-100 text-green-800',
			entertainment: 'bg-pink-100 text-pink-800',
			other: 'bg-yellow-100 text-yellow-800'
		};
		return colors[category as keyof typeof colors] || colors.other;
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
					Clickable Floor map
				</h1>

				{/* Floor Switcher */}
				<div className="bg-white rounded-lg shadow-md p-6 mb-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
							<Layers size={20} />
							Select Floor
						</h3>
						<div className="text-sm text-gray-600">
							{currentFloor.description}
						</div>
					</div>
					<div className="flex gap-3 flex-wrap">
						{FLOORS.map((floor) => (
							<button
								key={floor.id}
								onClick={() => setSelectedFloor(floor.id)}
								className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
									selectedFloor === floor.id
										? 'bg-blue-600 text-white shadow-lg transform scale-105'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
								}`}
							>
								{floor.name}
							</button>
						))}
					</div>
				</div>

				{/* Search and Filter Section */}
				<div className="bg-white rounded-lg shadow-md p-6 mb-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						{/* Search */}
						<div className="md:col-span-2">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									placeholder="Search shops by name..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-700 text-gray-900"
								/>
							</div>
						</div>

						{/* Category Filter */}
						<div>
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
							>
								<option value="all">All Categories</option>
								<option value="clothing">Clothing</option>
								<option value="footwear">Footwear</option>
								<option value="electronics">Electronics</option>
								<option value="food">Food</option>
								<option value="services">Services</option>
								<option value="entertainment">Entertainment</option>
								<option value="other">Other</option>
							</select>
						</div>

						{/* Status Filter */}
						<div>
							<select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
							>
								<option value="all">All Status</option>
								<option value="rented">Rented</option>
								<option value="vacant">Vacant</option>
							</select>
						</div>
					</div>

					{/* Filter Results and Clear */}
					<div className="flex justify-between items-center mt-4">
						<div className="text-sm text-gray-600">
							{filteredShops.length} of {SHOPS.length} shops found
						</div>
						<button
							onClick={clearFilters}
							className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
						>
							<X size={16} />
							Clear Filters
						</button>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
					<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-500 mb-1">Total Shops</p>
								<p className="text-3xl font-bold text-gray-800">{SHOPS.length}</p>
							</div>
							<div className="bg-blue-100 p-3 rounded-full">
								<Building2 className="w-6 h-6 text-blue-600" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-500 mb-1">Rented (Paid)</p>
								<p className="text-3xl font-bold text-green-600">
									{SHOPS.filter((s) => s.status === 'rented' && s.rentStatus === 'paid').length}
								</p>
							</div>
							<div className="bg-green-100 p-3 rounded-full">
								<DollarSign className="w-6 h-6 text-green-600" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-500 mb-1">Rented (Unpaid)</p>
								<p className="text-3xl font-bold text-red-600">
									{SHOPS.filter((s) => s.status === 'rented' && s.rentStatus === 'unpaid').length}
								</p>
							</div>
							<div className="bg-red-100 p-3 rounded-full">
								<AlertCircle className="w-6 h-6 text-red-600" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-500 mb-1">Vacant</p>
								<p className="text-3xl font-bold text-yellow-600">
									{SHOPS.filter((s) => s.status === 'vacant').length}
								</p>
							</div>
							<div className="bg-yellow-100 p-3 rounded-full">
								<MapPin className="w-6 h-6 text-yellow-600" />
							</div>
						</div>
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
						src={currentFloor.image}
						alt={`${currentFloor.name} Floor Plan`}
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

							const isFiltered = filteredShops.some(filteredShop => filteredShop.id === shop.id);
							const isHighlighted = highlightedShopId === shop.id;

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
											!isFiltered ? 'rgba(156,163,175,0.3)' : // gray for filtered out
											shop.status === 'rented'
												? shop.rentStatus === 'paid'
													? 'rgba(34,197,94,0.5)' // green
													: 'rgba(185,28,28,0.6)' // darker red
												: 'rgba(234,179,8,0.6)' // darker yellow
										}
										stroke={isHighlighted ? '#3B82F6' : 'black'}
										strokeWidth={isHighlighted ? '3' : '1'}
										onClick={() => isFiltered && handleShopClick(shop)}
										onMouseEnter={() => handleShopHover(shop.id)}
										onMouseLeave={() => handleShopHover(null)}
										style={{ 
											cursor: isFiltered ? 'pointer' : 'not-allowed',
											opacity: isFiltered ? 1 : 0.3,
											transition: 'all 0.2s ease'
										}}
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
											opacity: isFiltered ? 1 : 0.5
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

				{/* Filtered Shops List */}
				{currentShops.length > 0 && (
					<div className="mt-8 bg-white rounded-lg shadow-md p-6">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">
								{searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
									? 'Filtered Shops' 
									: 'All Shops'}
							</h2>
							<div className="text-sm text-gray-600">
								Showing {indexOfFirstShop + 1}-{Math.min(indexOfLastShop, filteredShops.length)} of {filteredShops.length} shops
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{currentShops.map((shop) => (
								<div
									key={shop.id}
									className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
									onClick={() => handleShopClick(shop)}
									onMouseEnter={() => handleShopHover(shop.id)}
									onMouseLeave={() => handleShopHover(null)}
								>
									<div className="flex justify-between items-start mb-2">
										<h3 className="font-semibold text-gray-800">{shop.name}</h3>
										<span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(shop.category)}`}>
											{shop.category}
										</span>
									</div>
									<div className="text-sm text-gray-600 space-y-1">
										<div className="flex justify-between">
											<span>Size:</span>
											<span>{shop.size}</span>
										</div>
										<div className="flex justify-between">
											<span>Status:</span>
											<span className={`font-medium ${
												shop.status === 'rented' ? 'text-green-600' : 'text-yellow-600'
											}`}>
												{shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
											</span>
										</div>
										{shop.contact?.phone && (
											<div className="flex justify-between">
												<span>Phone:</span>
												<span className="text-xs">{shop.contact.phone}</span>
											</div>
										)}
										{shop.hours && (
											<div className="flex justify-between">
												<span>Hours:</span>
												<span className="text-xs">{shop.hours.opening} - {shop.hours.closing}</span>
											</div>
										)}
									</div>
								</div>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
								<div className="text-sm text-gray-600">
									Page {currentPage} of {totalPages}
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
										disabled={currentPage === 1}
										className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
											currentPage === 1
												? 'bg-gray-100 text-gray-400 cursor-not-allowed'
												: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
										}`}
									>
										Previous
									</button>
									
									<div className="flex items-center gap-1">
										{[...Array(totalPages)].map((_, index) => {
											const pageNumber = index + 1;
											// Show max 5 page numbers with ellipsis for more pages
											if (
												pageNumber === 1 || 
												pageNumber === totalPages ||
												(pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
											) {
												return (
													<button
														key={pageNumber}
														onClick={() => setCurrentPage(pageNumber)}
														className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
															currentPage === pageNumber
																? 'bg-blue-600 text-white'
																: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
														}`}
													>
														{pageNumber}
													</button>
												);
											} else if (
												pageNumber === currentPage - 2 || 
												pageNumber === currentPage + 2
											) {
												return (
													<span key={pageNumber} className="px-2 text-gray-400">
														...
													</span>
												);
											}
											return null;
										})}
									</div>
									
									<button
										onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
										disabled={currentPage === totalPages}
										className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
											currentPage === totalPages
												? 'bg-gray-100 text-gray-400 cursor-not-allowed'
												: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
										}`}
									>
										Next
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{isModalOpen && selectedShop && (
				<ShopModal shop={selectedShop} onClose={closeModal} />
			)}
		</main>
	);
}
