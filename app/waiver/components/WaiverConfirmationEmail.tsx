import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Hr,
  Link,
  Preview,
  Tailwind,
} from "@react-email/components";

import { getWaiverById } from "@/app/actions/waiver";

export default async function WaiverConfirmationEmail({
  name,
  id,
  date,
  waiverId,
}: {
  name: string;
  id: string;
  date: string;
  waiverId: string;
}) {
  const waiver = await getWaiverById(waiverId);

  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <Html>
      <Head />
      <Preview>Your waiver has been successfully submitted</Preview>
      <Tailwind>
        <Body className='bg-gray-100 font-sans'>
          <Container className='bg-white max-w-xl mx-auto p-6 rounded-lg shadow-md text-center px-4'>
            <Text className='text-green-600 text-2xl font-bold mb-4'>
              ✅ Waiver Submitted
            </Text>
            <Text className='text-gray-800 text-lg leading-relaxed mb-6'>
              Thanks for signing, <span className='font-semibold'>{name}</span>!
              <br />
              Your waiver has been successfully submitted.
            </Text>
            <Hr className='border-gray-300 my-6' />
            <Text className='text-sm text-gray-600'>
              <strong className='text-red-500'>Confirmation ID:</strong> {id}
            </Text>

            <Text className='text-sm text-red-500'>
              <strong>Submitted on:</strong>{" "}
              <span className='text-gray-600'>{formattedDate}</span>
            </Text>
            <Link
              href={`https://waivify.com/waiver/${waiver?.token}`}
              className='text-center text-sm bg-teal-600 text-white px-5 py-2 rounded-md inline-block'
            >
              View Your Waiver
            </Link>

            <Link
              href={`https://waivify.com/api/download?waiverId=${waiverId}`}
              className='text-sm text-blue-600 mt-4 block'
            >
              Download PDF Copy
            </Link>
            <Text className='text-xs text-gray-400 mt-10'>
              This confirmation was sent by Waivify. Questions? Reach out at{" "}
              <Link href='mailto:support@waivify.com'>support@waivify.com</Link>
            </Text>
            <Img
              src={`https://waivify.com/api/email?waiverId=${id}`}
              width='1'
              height='1'
              alt=''
              style={{ display: "none" }}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
