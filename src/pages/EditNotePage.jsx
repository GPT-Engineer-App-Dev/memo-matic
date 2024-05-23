import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, Checkbox } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Assuming you have a supabaseClient.js file for initializing Supabase

const EditNotePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    const response = await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec`,
      },
    });
    const data = await response.json();
    setTitle(data[0].title);
    setContent(data[0].content);
    setIsPrivate(data[0].private);
  };

  const updateNote = async () => {
    let imageUrl = note.image_url;
    if (image) {
      const { data, error } = await supabase.storage
        .from('notes')
        .upload(`public/${image.name}`, image);

      if (error) {
        console.error("Error uploading image:", error);
        return;
      }

      imageUrl = data.Key;
    }

    await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, private: isPrivate, image_url: imageUrl }),
    });
    navigate("/");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Edit Note</Heading>
      <FormControl id="title" mb={4}>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl id="content" mb={4}>
        <FormLabel>Content</FormLabel>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </FormControl>
      <FormControl id="private" mb={4}>
        <Checkbox isChecked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}>
          Private
        </Checkbox>
      </FormControl>
      <FormControl id="image" mb={4}>
        <FormLabel>Image</FormLabel>
        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </FormControl>
      <Button colorScheme="teal" onClick={updateNote}>
        Update
      </Button>
    </Box>
  );
};

export default EditNotePage;