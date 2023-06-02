<template>
  <div class="table-wrap" :class="`table-wrap__type${type}`">
    <div class="content-wrap">
      <div class="table-wrap__header">
        <slot name="header"></slot>
      </div>
      <template v-if="type == 1">
        <div class="table-wrap__content" :class="{'is-box-shadow':boxShadow}">
          <div class="table-wrap__body">
            <section>
              <a-spin :loading="loading" :tip="loadingTip" dot>
                <slot name="body"></slot>
              </a-spin>
            </section>
          </div>
          <div class="table-wrap__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="table-wrap__body" :class="{'is-box-shadow':boxShadow}">
          <section>
            <slot name="body"></slot>
          </section>
        </div>
        <div class="table-wrap__footer">
          <slot name="footer"></slot>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: '0',
    },
    boxShadow: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingTip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.table-wrap {
  height: 100%;

  ::v-deep(.arco-spin) {
    height: 100%;
  }

  &.table-wrap__type0 {
    .content-wrap {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .table-wrap__header {
      position: relative;
      padding: 0 0 16px 0;
    }

    .table-wrap__body {
      flex: 1;
      position: relative;

      >section {
        height: 100%;
        border: 1px solid var(--color-neutral-3);
        border-radius: 8px;

        ::v-deep(.arco-table) {
          height: 100% !important;

          .arco-spin {
            display: block;

            .arco-table-container {
              height: 100%;
              border: none;
              border-radius: 0px;

              .arco-table-content {
                display: flex;
                flex-direction: column;
                height: 100%;

                .arco-table-body {
                  flex: 1;
                  max-height: none !important;

                  table {
                    position: absolute;
                    width: 100%;
                    max-height: 100%;
                  }
                }

                .arco-table-tr:last-child {
                  td {
                    border-bottom: none;
                  }
                }
              }
            }
          }
        }
      }

      &.is-box-shadow {
        >section {
          border: none;
        }
      }
    }

    .table-wrap__footer {
      display: flex;
      justify-content: flex-end;
      position: relative;
      padding: 16px 0 0;
    }
  }

  &.table-wrap__type1 {
    @extend .table-wrap__type0;

    .table-wrap__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--color-neutral-3);
      border-radius: 8px;

      .table-wrap__body>section {
        border: none;
        border-bottom: 1px solid var(--color-neutral-3);
        border-radius: 0px;
      }

      .table-wrap__footer {
        padding: 16px;
      }
    }
  }
}
</style>