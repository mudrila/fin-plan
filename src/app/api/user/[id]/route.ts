import { cookies } from 'next/headers'
import { NextResponse } from "next/server";
import { emailRegex, passwordRegex } from "@/constants/content";
import { generateHashPassword } from "@/utils";
import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;

	try {
		const id = params.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

		if (userId !== id){
      return NextResponse.json({
        errorMessage: "You don't have permission to edit this budget account",
      });
    }
		const { name, email, password, image } = await request.json();
		const updateData: any = {};

    if (name) {
      updateData.name = name;
    }

    if (image) {
      updateData.image = image;
    }

    if (email) {
      if (!email.match(emailRegex)) {
        return NextResponse.json({ errorMessage: 'Invalid email format' });
      }
      updateData.email = email;
    }

    if (password) {
      if (!password.match(passwordRegex)) {
        return NextResponse.json({ errorMessage: 'Invalid password format' });
      }
      const passwordHash = await generateHashPassword(password);
      updateData.password = passwordHash.hash;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ errorMessage: 'Nothing to update' });
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true });


	} catch (e) {
		console.error(e, 'Error during user updating');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while updating user.',
    });
	}
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const id = params.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

		if (userId !== id){
      return NextResponse.json({
        errorMessage: "You don't have permission to edit this budget account",
      });
    }

    await prisma.user.delete({ where: {id} })
    cookies().delete('next-auth.session-token')
    cookies().delete('next-auth.csrf-token')

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e, 'Error during user deletion');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while deleting user.',
    });
  }
}
