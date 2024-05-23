import { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const EditNotePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    const response = await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });
    const data = await response.json();
    setTitle(data[0].title);
    setContent(data[0].content);
  };

  const updateNote = async () => {
    await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
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
      <Button colorScheme="teal" onClick={updateNote}>
        Update
      </Button>
    </Box>
  );
};

export default EditNotePage;