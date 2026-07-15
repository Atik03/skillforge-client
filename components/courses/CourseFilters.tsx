"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  level: string;
  setLevel: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}


export default function CourseFilters({
  search,
  setSearch,
  category,
  setCategory,
  level,
  setLevel,
  sort,
  setSort,
}: Props) {

  return (
    <div className="bg-base-100 border border-base-300 rounded-2xl p-5 shadow mb-8">

      <div className="grid md:grid-cols-4 gap-4">


        <input
          type="text"
          placeholder="Search course..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
        />


        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e)=>
            setCategory(e.target.value)
          }
        >

          <option value="">
            All Categories
          </option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="UI/UX Design">
            UI/UX Design
          </option>

          <option value="Data Science">
            Data Science
          </option>

          <option value="Business">
            Business
          </option>

        </select>



        <select
          className="select select-bordered w-full"
          value={level}
          onChange={(e)=>
            setLevel(e.target.value)
          }
        >

          <option value="">
            All Levels
          </option>

          <option value="Beginner">
            Beginner
          </option>

          <option value="Intermediate">
            Intermediate
          </option>

          <option value="Advanced">
            Advanced
          </option>

        </select>



        <select
          className="select select-bordered w-full"
          value={sort}
          onChange={(e)=>
            setSort(e.target.value)
          }
        >

          <option value="">
            Sort By
          </option>

          <option value="price-asc">
            Price Low to High
          </option>

          <option value="price-desc">
            Price High to Low
          </option>

          <option value="newest">
            Newest
          </option>

        </select>


      </div>

    </div>
  );
}