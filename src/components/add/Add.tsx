import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import "./add.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Add = (props: Props) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    createdAt: "",
    verified: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        `https://execlusive-admin-dashboard.vercel.app/api/${props.slug}s`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999,
            img: "",
            ...formData,
          }),
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //add new item or user or product
    //axios.post (`/api/$(slug)`)
    // mutation.mutate();
    mutation.mutate();
    props.setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column, index) => (
              <div className="item" key={index}>
                <label>{column.headerName}</label>
                <input
                  onChange={handleChange}
                  type={column.type}
                  name={column.field}
                  placeholder={column.field}
                />
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
