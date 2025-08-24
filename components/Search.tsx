"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Models } from "node-appwrite";
import React from "react";
import { Input } from "./ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { getFiles } from "@/lib/actions/file.action";
import Thumbnail from "./Thumbnail";
import { FormatDateTime } from "./FormatDateTime";

const Search = () => {
  const router = useRouter();
  const path = usePathname();
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResult] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const [debounceQuery] = useDebounce(query, 399);
  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResult([]);
    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`
    );
  };
  useEffect(() => {
    const fetchFiles = async () => {
      if (debounceQuery.length === 0) {
        setResult([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({types:[], searchText: debounceQuery });
      setResult(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [debounceQuery]);
  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          width={24}
          height={24}
          alt="serach"
          src="/assets/icons/search.svg"
        />
        <Input
          value={query}
          placeholder="search...."
          onChange={(e) => setQuery(e.target.value)}
        />
        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  onClick={() => handleClickItem(file)}
                  key={file.$id}
                  className="flex justify-between item-center"
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      imageClassName=""
                      className="size-9 min-w-7"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>
                  <FormatDateTime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-100"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">no result found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
