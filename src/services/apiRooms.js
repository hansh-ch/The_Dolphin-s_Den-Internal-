import { supabase, supabaseUrl } from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");
  if (error) {
    console.log(error);
    throw new Error("Rooms cannot be fetched");
  }

  return data;
}

export async function deleteRoom(id) {
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cannot delete room");
  }
}

export async function createRoom(body) {
  const hasImagePath = body.image?.startsWith?.(supabaseUrl);
  // Creating unique name for image and also removing slashes to that supabase doesn't create new folders
  const imageName = `${Math.random()}-${body.image.name}`.replaceAll("/", "");

  // Create image path
  // Create image path
  const imagePath = hasImagePath
    ? body.image
    : `${supabaseUrl}/storage/v1/object/public/rooms-images/${imageName}`;
  //1. Create cabin
  const { data, error } = await supabase
    .from("rooms")
    .insert([{ ...body, image: imagePath }])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Cannot add room");
  }
  //2. Upload Image
  if (hasImagePath) return data;
  const { data: storageData, error: storageError } = await supabase.storage
    .from("rooms-images")
    .upload(imageName, body.image);
  // 3. delete room if there was error uplaoding corresponding image
  if (storageError) {
    const { error } = await supabase.from("rooms").delete().eq("id", data.id);
    console.log(error);
    throw new Error(
      "room image cannot be uploaded, so new room cannot be created"
    );
  }
  return data;
}

export async function editRoom(id, body) {
  const hasImagePath = body.image?.startsWith?.(supabaseUrl);

  // // Creating unique name for image and also removing slashes to that supabase doesn't create new folders
  const imageName = `${Math.random()}-${body.image.name}`.replaceAll("/", "");
  // Create image path
  const imagePath = hasImagePath
    ? body.image
    : `${supabaseUrl}/storage/v1/object/public/rooms-images/${imageName}`;

  // //1. Update cabin
  const { data, error } = await supabase
    .from("rooms")
    .update({ ...body, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Cannot edit room");
  }
  // //2. Upload Image
  if (!hasImagePath) {
    const { data: storageData, error: storageError } = await supabase.storage
      .from("rooms-images")
      .upload(imageName, body.image);

    // // 3. delete room if there was error uplaoding corresponding image
    if (storageError) {
      throw new Error("room image cannot be editted");
    }
  }
  return data;
}
