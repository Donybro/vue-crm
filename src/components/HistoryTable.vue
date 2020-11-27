<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{"Sum"|localize}}</th>
          <th>{{"Date"|localize}}</th>
          <th>{{"Category"|localize}}</th>
          <th>{{"Type"|localize}}</th>
          <th>{{"Open"|localize}}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(record, index) in allItems[currentPage-1]" :key="record.name">
          <td>{{ index + 1 }}</td>
          <td>{{ record.amount | currency }}</td>
          <td>{{ Date.parse(record.date) | date("datetime") }}</td>
          <td>{{ record.categoryName }}</td>
          <td>
            <span
              class="white-text badge"
              :class="[record.typeClass]"
            >{{ record.typeText | localize }}</span>
          </td>
          <td>
            <button
              v-tooltip="'Открыть запись'"
              class="btn-small btn"
              @click="$router.push(`/detail-record/${record.id}`)"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      :page-count="paginationListLength"
      v-model="currentPage"
      :page-range="pageSize"
      :click-handler="paginateHandler"
      :prev-text="prevTextButton"
      :next-text="nextTextButton"
      :container-class="'pagination'"
      page-class="waves-effect"
      active-class="active"
    ></paginate>
  </div>
</template>

<script>
import chunk from "lodash.chunk";
import localize from "../filters/filter.localize";
export default {
  name: "HistoryTable",
  props: ["records"],
  data() {
    return {
      currentPage: 1,
      pageSize: 5
    };
  },
  computed: {
    allItems() {
      return chunk(this.records, this.pageSize);
    },
    paginationListLength() {
      return this.allItems.length;
    },
    prevTextButton() {
      return localize("Prev");
    },
    nextTextButton() {
      return localize("Next");
    }
  },
  methods: {
    paginateHandler(num) {
      this.currentPage = +num;
      this.$router.push(`${this.$route.path}?page=${this.currentPage}`);
    }
  },
  mounted() {
    if (this.$route.query.page) {
      this.currentPage = +this.$route.query.page;
    }
  }
};
</script>

<style scoped></style>
