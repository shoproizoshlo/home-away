# HomeAway

The project is an **Airbnb clone** built using Next.js, designed to simulate the features of the Airbnb rental platform. The project built using Next.js, including server-side rendering, static site generation, and dynamic routing with a focus on showcasing properties, searching, and filtering. Designed as part of a course to demonstrate practical skills in building a real-world application with Next.js. Key features include:

- **Property Listings:** Displays a range of vacation rental properties with detailed information.
- **Filter and Search:** Users can filter listings by type of property and search for properties.
- A booking system integrated.
- **Dynamic Routing**: Each property has its own page with detailed information.
- **Data Fetching**: Utilizes Next.js's data-fetching methods for server-side rendering.
- **User Interaction**: Includes form handling and interactive UI elements.
- **Responsive Design:** The application is optimized for both desktop and mobile devices.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

- **Data Management**: Handling data fetching and displaying dynamic content efficiently.
- **Dynamic Routing:** Implementing dynamic routes to handle various property listings and details.
- **State Management:** Handling complex state management for filtering and displaying the property listings.
- **Server-Side Rendering (SSR):** Managing SSR to ensure that data is pre-rendered for faster load times and improved SEO.
- **Complex Layouts:** Implementing complex, responsive layouts that work across multiple devices and screen sizes.
- **API Integration:** Fetching and displaying data from external sources or APIs and handling errors gracefully.
- Integrating third-party services for payment processing and authentication.

### Screenshot
![](./screenshots/home-away-main.png)
![](./screenshots/home-away-main-auth.png)
![](./screenshots/home-away-rentals.png)
![](./screenshots/home-away-reviews-dark.png)
![](./screenshots/home-away-admin.png)

### Links

[Live site URL](https://home-away-phi.vercel.app/)

## My process

### Built with

- **Semantic HTML5 Markup:** Use of HTML5 elements to ensure the content is meaningful and accessible. [HTML5 Documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- **CSS Custom Properties:** CSS variables for reusable, maintainable styling. [CSS Custom Properties Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- **Flexbox:** A CSS layout module for designing flexible and responsive layout structures. [Flexbox Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
- **CSS Grid:** A CSS layout system for creating complex and responsive grid-based designs. [CSS Grid Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- **Mobile-first Workflow:** Designing and developing with mobile devices as the primary focus, ensuring a responsive experience.
- **Next.js:** A React framework for server-side rendering. [Next.js Documentation](https://nextjs.org/docs)
- **React:** A JavaScript library for building user interfaces. [React Documentation](https://reactjs.org/docs/getting-started.html)
- **Clerk:** A complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users. [Clerk Documentation](https://clerk.com/docs)
- **Supabase & Prisma:** Open-source tools for database management and backend development. [Supabase Documentation](https://supabase.com/docs), [Prisma Documentation](https://www.prisma.io/docs)
- **Shadcn/ui:** A collection of re-usable components that you can copy and paste into your apps. [Shadcn/ui Documentation](https://ui.shadcn.com/docs)
- **Tailwind CSS:** A utility-first CSS framework for creating custom designs quickly. [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **Stripe:** A payment processing platform for handling transactions. [Stripe Documentation](https://stripe.com/docs)
- **Vercel:** A platform for deployment and hosting of Next.js applications. [Vercel Documentation](https://vercel.com/docs)

### Here's a unified version of the "What I Learned" section:

### What I Learned

- **Next.js Fundamentals**: Setting up and configuring a Next.js project.
- **Dynamic Routing**: Implementing and managing dynamic routes in a Next.js application.
- **Server-Side Rendering**: Using Next.js’s data-fetching methods to render pages on the server.
- **State Management**: Approaches for managing and filtering state in a React and Next.js application.
- **Data Fetching Techniques**: Best practices for fetching data and handling asynchronous operations in a Next.js environment.
- **API Integration**: Integrating APIs, fetching data, and managing asynchronous operations.
- **Payment Integration**: Handling payment processing and secure transactions using Stripe.
- **User Authentication**: Implementing user authentication with Clerk.
- **Data Validation**: Using Zod for building schemas and validating data with type safety and error handling.
- **Database Management**: Working with Supabase and Prisma for database management and operations.

#### [Clerk + Next.js Setup](https://clerk.com/docs/quickstarts/nextjs)

create .env.local

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

```tsx
import { ClerkProvider } from "@clerk/nextjs";

return (
  <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="container py-10">{children}</main>
        </Providers>
      </body>
    </html>
  </ClerkProvider>
);
```

create middleware.ts

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/bookings(.*)",
  "/checkout(.*)",
  "/favorites(.*)",
  "/profile(.*)",
  "/rentals(.*)",
  "/reviews(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

Remote Patterns

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "jxdujzgweuaphpgoowhu.supabase.co",
      },
    ],
  },
};

export default nextConfig;
```

#### Zod

is a JavaScript library for building schemas and validating data, providing type safety and error handling.

- create utils/schemas.ts

```ts
import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
});
```

- create utils/actions.ts
- import in profile/create page.tsx

```ts
"use server";

import { profileSchema } from "./schemas";

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    console.log(validatedFields);
    return { message: "Profile Created" };
  } catch (error) {
    console.log(error);
    return { message: "there was an error..." };
  }
};
```

#### [Prisma Instance](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution)

In development, the command next dev clears Node.js cache on run. This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.

- create utils/db.ts

```ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

#### Connect Supabase with Prisma

[Useful Info](https://supabase.com/partners/integrations/prisma)
[Prisma Docs](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

- add to .env

```bash
DATABASE_URL=""
DIRECT_URL=""
```

- DATABASE_URL : Transaction + Password + "?pgbouncer=true&connection_limit=1"
- DIRECT_URL : Session + Password

```prisma
datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  directUrl         = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

model TestProfile {
id  String @id @default(uuid())
name String
}

```

(creates a new migration for your database schema)

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma db push
```

```bash
npx prisma studio
```

Prisma's findUnique and findFirst methods are used to retrieve a single record from the database, but they have some differences in their behavior:

- findUnique: This method is used when you want to retrieve a single record that matches a unique constraint or a primary key. If no record is found, it returns null.

- findFirst: This method is used when you want to retrieve a single record that matches a non-unique constraint. It can also be used with ordering and filtering. If no record is found, it returns null.

In summary, use findUnique when you're sure the field you're querying by is unique, and use findFirst when you're querying by a non-unique field or need more complex queries with ordering and filtering.

```ts
const user = await prisma.user.findUnique({
  where: {
    email: "alice@prisma.io",
  },
});

const user = await prisma.user.findFirst({
  where: {
    email: {
      contains: "prisma.io",
    },
  },
  orderBy: {
    name: "asc",
  },
});
```

#### Setup Supabase

```sh
npm install @supabase/supabase-js
```

utils/supabase.ts

```ts
import { createClient } from "@supabase/supabase-js";

const bucket = "home-away-draft";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  // const newName = `/users/${timestamp}-${image.name}`;
  const newName = `${timestamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: "3600",
    });
  if (!data) throw new Error("Image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
```

#### [React Share](https://www.npmjs.com/package/react-share)

```tsx
"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share";

function ShareButton({
  propertyId,
  name,
}: {
  propertyId: string;
  name: string;
}) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/properties/${propertyId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="p-2">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} subject={name}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}
export default ShareButton;
```

#### [React Leaflet](https://react-leaflet.js.org/)

Leaflet makes direct calls to the DOM when it is loaded, therefore React Leaflet is not compatible with server-side rendering.

```sh
npm install react react-dom leaflet react-leaflet
```

```sh
npm install -D @types/leaflet
```

- components/properties/PropertyMap.tsx

```tsx
"use client";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

import { findCountryByCode } from "@/utils/countries";
import CountryFlagAndName from "../card/CountryFlagAndName";
import Title from "./Title";

function PropertyMap({ countryCode }: { countryCode: string }) {
  const defaultLocation = [51.505, -0.09] as [number, number];
  const location = findCountryByCode(countryCode)?.location as [number, number];

  return (
    <div className="mt-4">
      <div className="mb-4 ">
        <Title text="Where you will be staying" />
        <CountryFlagAndName countryCode={countryCode} />
      </div>
      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-[50vh] rounded-lg relative z-0"
        center={location || defaultLocation}
        zoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Marker
          position={location || defaultLocation}
          icon={markerIcon}
        ></Marker>
      </MapContainer>
    </div>
  );
}
export default PropertyMap;
```

#### Blocked Periods/Dates

BookingCalendar.tsx

```tsx
function BookingCalendar() {
  const bookings = useProperty((state) => state.bookings);
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      // add disabled
      disabled={blockedPeriods}
    />
  );
}
export default BookingCalendar;
```

#### How to seet up Admin User - Middleware

- refactor middleware
- create ENV variable with userId
- add to VERCEL

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/properties(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  const isAdminUser = auth().userId === process.env.ADMIN_USER_ID;
  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### Continued development

- **Enhanced UI/UX**: Adding more interactive features and improving the user interface.
- **Performance Optimization**: Implementing performance enhancements and optimizations.
- **Enhanced Filtering Options:** Adding more sophisticated filtering criteria for better user experience.
- **Testing:** Implementing comprehensive testing strategies to ensure robustness and reliability.
- **Filter:** Implementing more advanced search and filter functionalities.

### Useful resources

Certainly! Here's a unified list of useful resources with a consistent format:

### Useful Resources

- **Next.js Examples:** [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples) – Examples of how to use Next.js for various use cases.
- **React Hooks:** [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html) – Official documentation on using hooks in React for state and lifecycle management.
- **Frontend Performance Tips:** [Web.dev Performance Tips](https://web.dev/fast/) – Tips and best practices for optimizing frontend performance.
- **React Icons:** [React Icons](https://react-icons.github.io/react-icons/) – A collection of popular icons to use in React applications.
- **UI Themes:** [Themes](https://ui.shadcn.com/themes) – Resources for applying themes to your web applications.
- **Next.js Dark Mode:** [Next.js Dark Mode](https://ui.shadcn.com/docs/dark-mode/next) – Guide to implementing dark mode in Next.js applications.
- **Clerk + Next.js Setup:** [Clerk + Next.js Setup](https://clerk.com/docs/quickstarts/nextjs) – Quickstart guide for setting up Clerk with Next.js.
- **Clerk User Metadata:** [Clerk User Metadata](https://clerk.com/docs/users/metadata) – Documentation on managing user metadata with Clerk.
- **Supabase Integration:** [Supabase Info](https://supabase.com/partners/integrations/prisma) – Information on integrating Supabase with Prisma.
- **Prisma Docs:** [Prisma Docs](https://www.prisma.io/docs/concepts/components/prisma-client/crud) – Documentation on using Prisma for database operations.
- **Prisma in Next.js:** [Prisma Instance](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution) – Best practices for using Prisma in a Next.js project.
- **React Share:** [React Share](https://www.npmjs.com/package/react-share) – Library for adding social sharing buttons in React applications.
- **React Leaflet:** [React Leaflet](https://react-leaflet.js.org/) – Documentation for using Leaflet maps in React.
- **Recharts:** [Zustand Docs](https://recharts.org/en-US/) – Documentation for Recharts library for charts.
- **Zustand Docs:** [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction) – Documentation for Zustand, a small, fast state-management library for React.

## Acknowledgments

- **John Smilga:** For providing the foundational project structure and guidance through the [course](https://www.udemy.com/share/10b31c3@5ySZMN5LRmlyodaKcgEXLbBEhUMKtBi4CcBWGnNyo9dIBx1PPDoXx8R7xEptYRClhw==/) materials.
