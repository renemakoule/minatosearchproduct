"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BorderBeam } from "@/components/ui/border-beam";
import Popup from "./Popup";
import FilterButton from "./FilterButton";

interface ProductCardProps {
  imageUrl: string;
  productName: string;
  price: string;
  source: string;
  link: string;
}

export default function TableauDeBordProduit(
  { imageUrl, productName, price, source, link }: ProductCardProps = {
    imageUrl: "/placeholder.svg?height=100&width=100",
    productName: "Produit",
    price: "9,99 €",
    source: "",
    link: "#",
  }
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche pour:", searchTerm);
  };

  const products = [
    {
      imageUrl: "/3.jpg",
      productName: "Produit 10",
      price: "4,99 €",
      link: "#",
    },
    {
      imageUrl: "/2.jpg",
      productName: "Produit 11",
      price: "34,99 €",
      link: "#",
    },
    {
      imageUrl: "/1.jpg",
      productName: "Produit 12",
      price: "1,99 €",
      link: "#",
    },
    {
      imageUrl: "/4.jpg",
      productName: "Produit 13",
      price: "24,99 €",
      link: "#",
    },
    {
      imageUrl: "/5.jpg",
      productName: "Produit 14",
      price: "20,99 €",
      link: "#",
    },
    {
      imageUrl: "/6.jpg",
      productName: "Produit 15",
      price: "2,99 €",
      link: "#",
    },
    {
      imageUrl: "/7.jpg",
      productName: "Produit 16",
      price: "124,99 €",
      link: "#",
    },
    {
      imageUrl: "/8.jpg",
      productName: "Produit 17",
      price: "324,99 €",
      link: "#",
    },
    {
      imageUrl: "/9.jpg",
      productName: "Produit 18",
      price: "234,99 €",
      link: "#",
    },
  ];

  const product = [
    {
      imageUrl: "/3.jpg",
      productName: "Produit 10",
      price: "4,99 €",
      source: "Amazon",
      link: "#",
    },
    {
      imageUrl: "/2.jpg",
      productName: "Produit 11",
      price: "34,99 €",
      source: "Alibaba",
      link: "#",
    },
    {
      imageUrl: "/1.jpg",
      productName: "Produit 12",
      price: "1,99 €",
      source: "AliExpress",
      link: "#",
    },
    {
      imageUrl: "/4.jpg",
      productName: "Produit 13",
      price: "24,99 €",
      source: "Rakutun",
      link: "#",
    },
    {
      imageUrl: "/5.jpg",
      productName: "Produit 14",
      price: "20,99 €",
      source: "eBay",
      link: "#",
    },
    {
      imageUrl: "/6.jpg",
      productName: "Produit 15",
      price: "2,99 €",
      source: "Amazon",
      link: "#",
    },
    {
      imageUrl: "/7.jpg",
      productName: "Produit 16",
      price: "124,99 €",
      source: "Alibaba",
      link: "#",
    },
    {
      imageUrl: "/8.jpg",
      productName: "Produit 17",
      price: "324,99 €",
      source: "AliExpress",
      link: "#",
    },
  ];

  const VideoSkeleton = () => (
    <div className="overflow-hidden w-[250px] rounded-lg group cursor-pointer transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0 rounded-lg w-[250px]">
        <div className="relative aspect-video bg-muted rounded-lg">
          <Skeleton className="absolute top-0 left-0 w-full h-full rounded-lg" />
        </div>
      </CardContent>
    </div>
  );

  const ProductSkeleton = () => (
    <div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full rounded-lg" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    </div>
  );

  const SmallProductSkeleton = () => (
    <div className="w-[calc(50%-0.5rem)] sm:w-[150px] bg-white shadow-sm rounded-md overflow-hidden">
      <Skeleton className="w-full h-[120px]" />
      <div className="p-2">
        <Skeleton className="h-3 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="flex flex-col lg:flex-row gap-6">
        <FilterButton />
        {/* Right column (Video Suggestions) - Now first on small screens */}
        <div className="rounded-md w-full lg:w-1/3 lg:order-2 max-h-[550px] hide-scrollbar">
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-6 flex items-center text-primary sixtyfour-convergence">
                <Video className="h-6 w-6 mr-2" />
                Video Suggestions
              </h2>
              <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-4">
                {isLoading
                  ? Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="w-[150px] h-[200px] md:w-[300px] md:h-[350px] bg-gray-200 rounded-md animate-pulse flex-shrink-0"
                        />
                      ))
                  : Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <motion.div
                          key={index}
                          className="overflow-hidden w-[200px] h-[250px] md:w-[300px] md:h-[350px] rounded-md group cursor-pointer transition-all duration-300 hover:shadow-lg flex-shrink-0"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <CardContent className="p-0 rounded-md w-full h-full">
                            <div className="relative w-full h-full bg-muted rounded-lg">
                              <iframe
                                className="w-full h-full"
                                src="https://www.tiktok.com/player/v1/6718335390845095173?&music_info=1&description=1"
                                allow="fullscreen"
                                title={`video-${index}`}
                              ></iframe>
                              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                            </div>
                          </CardContent>
                        </motion.div>
                      ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Left column (Product listings) - Now second on small screens */}
        <div className="lg:w-2/3 lg:order-1 max-h-[550px] overflow-y-auto hide-scrollbar">
          {/* Products from minato.ai */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-4 p-4">
              {isLoading
                ? Array(9)
                    .fill(null)
                    .map((_, index) => <ProductSkeleton key={index} />)
                : products.map((product, index) => (
                    <motion.div
                      key={index}
                      className="relative w-[200px] h-[300px] rounded-md overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Link href={product.link}>
                        <Image
                          src={product.imageUrl}
                          alt={product.productName}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 p-4 text-white mb-2 edu-au-vic-wa-nt-dots"
                          initial={{ opacity: 0.8, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex space-x-14">
                            <p className="text-xs font-bold text-red-400">
                              {product.price}
                            </p>
                            <h3 className="text-xs font-medium line-clamp-2 mb-1">
                              {product.productName}
                            </h3>
                          </div>
                          <Link
                            href={product.link}
                            className="text-purple-300 hover:text-blue-300 text-sm"
                          >
                            More
                          </Link>
                        </motion.div>
                      </Link>
                      <BorderBeam size={250} duration={12} delay={9} />
                    </motion.div>
                  ))}
            </div>
          </div>

          {/* Products from other sources */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-4 p-4">
              {isLoading
                ? Array(8)
                    .fill(null)
                    .map((_, index) => <SmallProductSkeleton key={index} />)
                : product.map((product, index) => (
                    <motion.div
                      key={index}
                      className="w-[calc(50%-0.5rem)] sm:w-[200px] bg-white border border-[#f9fc54] shadow-sm rounded-md overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Link href={product.link}>
                        <div className="relative w-full h-[200px]">
                          <Image
                            src={product.imageUrl}
                            alt={product.productName}
                            fill
                            sizes="(max-width: 640px) 50vw, 200px"
                            className="object-cover"
                            quality={85}
                          />
                        </div>
                        <motion.div
                          className="p-2 mb-2 edu-au-vic-wa-nt-dots"
                          initial={{ opacity: 0.8, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex space-x-16">
                            <p className="text-xs text-cyan-600 mb-1">
                              {product.price}
                            </p>
                            <p className="text-xs text-yellow-600 mb-1">
                              {product.source}
                            </p>
                          </div>
                          <h3 className="text-xs truncate">
                            {product.productName}
                          </h3>
                          <Link
                            href={product.link}
                            className="text-[10px] text-blue-600 hover:underline mt-1 block"
                          >
                            More
                          </Link>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
