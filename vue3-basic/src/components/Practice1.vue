<template>
  <el-container>
    <el-header>
      <h1 style="color: #409EFF; text-align: center;">用户管理系统</h1>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1">
          <el-menu-item index="1">用户管理</el-menu-item>
          <el-menu-item index="2">角色管理</el-menu-item>
          <el-menu-item index="3">权限管理</el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              placeholder="搜索用户..."
              v-model="searchQuery"
              clearable
              suffix-icon="el-icon-search"
            />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="showAddDialog">添加用户</el-button>
          </el-col>
        </el-row>

        <el-table :data="filteredUsers" style="width: 100%" border>
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="role" label="角色" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="filteredUsers.length"
          @current-change="handlePageChange"
          layout="total, prev, pager, next"
          style="margin-top: 20px;"
        />
      </el-main>
    </el-container>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible">
      <el-form :model="newUser">
        <el-form-item label="用户名" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
          <el-input v-model="newUser.name" />
        </el-form-item>
        <el-form-item label="邮箱" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
          <el-input v-model="newUser.email" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="newUser.role">
            <el-option label="管理员" value="admin" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="editDialogVisible">
      <el-form :model="editUser">
        <el-form-item label="用户名">
          <el-input v-model="editUser.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editUser.email" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editUser.role">
            <el-option label="管理员" value="admin" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      pageSize: 5,
      users: [
        { id: 1, name: '用户A', email: 'userA@example.com', role: 'admin' },
        { id: 2, name: '用户B', email: 'userB@example.com', role: 'user' },
        { id: 3, name: '用户C', email: 'userC@example.com', role: 'admin' },
        { id: 4, name: '用户D', email: 'userD@example.com', role: 'user' },
        { id: 5, name: '用户E', email: 'userE@example.com', role: 'admin' },
        { id: 6, name: '用户F', email: 'userF@example.com', role: 'user' },
      ],
      newUser: { name: '', email: '', role: 'user' },
      editUser: {},
      addDialogVisible: false,
      editDialogVisible: false,
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    showAddDialog() {
      this.newUser = { name: '', email: '', role: 'user' };
      this.addDialogVisible = true;
    },
    addUser() {
      const newUser = { ...this.newUser, id: this.users.length + 1 };
      this.users.push(newUser);
      this.addDialogVisible = false;
    },
    showEditDialog(user) {
      this.editUser = { ...user };
      this.editDialogVisible = true;
    },
    updateUser() {
      const index = this.users.findIndex(user => user.id === this.editUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, this.editUser);
      }
      this.editDialogVisible = false;
    },
    deleteUser(id) {
      this.users = this.users.filter(user => user.id !== id);
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #f5f7fa;
}
.dialog-footer {
  text-align: right;
}
</style>