import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Blog } from "@/sanity.types";

const SobrePage = async () => {
  const blogs = await getAllBlogs(6);

  return (
    <div>
      <Container>
        <Title>Sobre</Title>
        <div className="bg-white rounded-lg p-6 md:p-10 mb-10 border border-gray-200">
          <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p>
              Na GTeam, acreditamos que treinar é muito mais do que levantar pesos; é sobre superar limites, criar disciplina e fazer parte de algo maior. O nome da nossa marca não é por acaso: nós somos um time.
            </p>
            <p>
              Nascemos com a missão de vestir quem leva o treino a sério, oferecendo camisas que unem estilo, conforto e a durabilidade necessária para aguentar a rotina intensa de exercícios. Sabemos que a roupa certa pode aumentar a sua confiança e o seu desempenho. Por isso, cada peça da GTeam é pensada para valorizar o seu shape e acompanhar o seu ritmo.
            </p>
            <p>
              Seja você um fisiculturista experiente ou alguém que está começando a transformar sua vida agora, a GTeam está aqui para te dar o suporte que você precisa.
            </p>
            <p className="font-semibold text-lg text-[#82181a]">
              Vista a camisa. Faça parte do time.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-10">
          {blogs?.map((blog: Blog) => (
            <div key={blog?._id} className="rounded-md overflow-hidden group">
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
              )}
              <div className="bg-gray-100 p-5">
                <div className="text-xs flex items-center gap-5">
                  <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((item: any, index: number) => (
                      <p
                        key={index}
                        className="font-semibold text-[#82181a] tracking-wider"
                      >
                        {item?.title}
                      </p>
                    ))}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-0.5 group-hover:bg-[#82181a] hover:cursor-pointer hoverEffect" />
                  </div>
                  <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-[#82181a] hoverEffect">
                    <Calendar size={15} />{" "}
                    {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-0.5 group-hover:bg-[#82181a] hoverEffect" />
                  </p>
                </div>
                <Link
                  href={`/sobre/${blog?.slug?.current}`}
                  className="text-base font-bold tracking-wide mt-5 line-clamp-2 hover:text-[#82181a] hoverEffect"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SobrePage;
