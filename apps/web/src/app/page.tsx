import Hero from "@/components/core/hero";
import Skills from "@/components/core/skills";
import { projects } from "@/data/projects";
import ProjectsCarousel from "@/components/core/projects/projects-carousel";
import HowIThink from "@/components/core/how-i-think";
import CaseStudy from "@/components/core/project-case";
import Lab from "@/components/core/experimental-lab";
import Tabs from "@/components/core/tabs";
import Testimonials from "@/components/core/testimonies/testimony";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import TestimonialForm from "@/components/core/testimonies/testimonies-cms/testimony-form";
import GuestLoginButton from "@/components/login/guest-login";
import { prisma } from "@/lib/prisma/prisma";
import { Suspense } from "react";

type Props = {
  searchParams: {
    token?: string;
  };
};

export default async function Home({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const session = await getServerSession(authOptions);

  const token = searchParams?.token;
  // Fetch only approved and active testimonials
  const approvedTestimonials = await prisma.testimonials.findMany({
    where: {
      is_approved: true,
      is_active: true,
    },
    include: {
      user: true, // To get the avatar/image from the OAuth profile
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return (
    <main className="container mx-auto px-6 overflow-x-hidden">
      <Hero token={token}/>
      <Tabs />
      <section className="py-20 max-w-6xl mx-auto px-1">
        {/* <div className="mt-16"> */}
          {/* <h2 className="text-3xl font-bold tracking-tight font-sans mb-4">Featured Projects</h2> */}
          {/* <div className="h-1 w-20 bg-primary rounded-full" /> */}
          <ProjectsCarousel
            projects={projects.filter((p) => p.featured)}
          />
        {/* </div> */}
      </section>
      <Skills />
      <CaseStudy project={projects[0]}/>
      <HowIThink />
      {/* <Lab /> */}
      {/* <Testimonials items={approvedTestimonials} /> */}
      <section
        id="testimonials"
        className="scroll-mt-24"
      >
        <Suspense fallback={null}>
          <Testimonials items={approvedTestimonials} token={token} />
        </Suspense>
      </section>
      <section className="py-20 px-6 bg-slate-500/3 mb-10 mx-auto max-w-6xl">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Leave a Note</h2>
          <p className="text-slate-500 text-sm mt-2">I value your feedback on our collaborations or projects.</p>
        </div>
        
        {session?.user ? (
          <TestimonialForm userId={session.user.id} />
        ) : token ? (
          // Invited guest — show form without login
          <TestimonialForm userId={token} isInvited />
        ) : (
          <div className="text-center p-12 border border-dashed border-slate-500/30 rounded-[2.5rem] flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm">
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Want to share your thoughts?
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Sign in to verify your identity and leave a testimonial.
            </p>
            
            <GuestLoginButton />
          </div>
        )}
      </section>
    </main>
  )
}