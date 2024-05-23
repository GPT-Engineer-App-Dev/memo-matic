import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Note = ({ note, onDelete }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Heading size="md">{note.title}</Heading>
      <Text mt={2}>{note.content}</Text>
      <Button as={Link} to={`/edit/${note.id}`} colorScheme="blue" mt={2}>
        Edit
      </Button>
      <Button colorScheme="red" mt={2} onClick={() => onDelete(note.id, { is_deleted: true })}>
        Delete
      </Button>
    </Box>
  );
};

export default Note;