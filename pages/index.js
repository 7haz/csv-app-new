import Head from "next/head";
import { useState } from "react";
import useFileStore from "../stores/useFileStore";
import styles from "../styles/Home.module.css";

import { CSVLink } from "react-csv";

import { BsFillTrashFill } from "react-icons/bs";

import items from "/public/data.json";

export default function Home() {
  const { list, add, remove } = useFileStore();

  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = () => {
    // brfore you add make sure it exists
    const name = items.find(i => i.sku == sku)?.name || false;
    if (name) {
      add({ sku, quantity, name });
      setQuantity("");
      setSku("");
    } else {
      setQuantity("");
      setSku("");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>دراجتي</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span>Last uptade 21/11/2021</span>
        <input
          name="filename"
          placeholder="من فرع ** الى فرع **ي"
          value={fileName}
          onChange={evt => setFileName(evt.target.value)}
        />
        <div className={styles.inputContainer}>
          <input value={sku} onChange={evt => setSku(evt.target.value)} placeholder="SKU" />
          <input
            value={quantity}
            onChange={evt => setQuantity(evt.target.value)}
            placeholder="Quanitity"
          />
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.downloadBtn}>
            <CSVLink data={list} filename={fileName ? fileName + ".csv" : "no-name"}>
              Download
            </CSVLink>
          </button>
          <button onClick={handleSubmit} className={styles.addBtn}>
            Add
          </button>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <th />
              <th>sku</th>
              <th>quantity</th>
              <th>Name</th>
            </thead>

            <tbody>
              {list.map(i => (
                <tr key={i.sku}>
                  <td>
                    <button onClick={() => remove(i.sku)}>
                      <BsFillTrashFill />
                    </button>
                  </td>
                  <td>{i.sku}</td>
                  <td>{i.quantity}</td>
                  <td>{i.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}